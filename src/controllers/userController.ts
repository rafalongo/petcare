import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Token } from "../utils/token";
import { UserModel } from "../models/userModel";
import { RoleModel } from "../models/roleModel";
import { AuthModel } from "../models/authModel";
import { RefreshTokenModel } from "../models/refreshTokenModel";

export const UserController = {
  // LOGIN
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserModel.findByEmail(email);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: "Senha incorreta" });

    const role = await RoleModel.findById(Number(user.role_id));
    if (!role) return res.status(404).json({ error: "Role não encontrada." });

    // Gera o access token (válido por 1h, por exemplo)
    const access_token = Token.generate({ id: user.id, email: user.email, role });

    // Gera e salva o refresh token (válido por 7 dias)
    const { token: refresh_token, expires_at } = AuthModel.generateRefreshToken(user.id);
    await AuthModel.saveRefreshToken(user.id, refresh_token, expires_at);

    // Retorna os tokens + dados do usuário
    res.json({
      access_token,
      refresh_token,
      user
    });
  },

  // REFRESH TOKEN
  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Token não informado" });

    const storedToken = await RefreshTokenModel.findByToken(refreshToken);
    if (!storedToken) return res.status(401).json({ message: "Token inválido" });

    if (new Date(storedToken.expires_at) < new Date()) {
      await RefreshTokenModel.remove(storedToken.id);
      return res.status(401).json({ message: "Token expirado" });
    }

    const payload = Token.verifyRefreshToken(refreshToken);
    if (!payload) return res.status(401).json({ message: "Token inválido" });

    const newAccessToken = Token.generate({ id: payload });
    res.json({ accessToken: newAccessToken });
  },

  // LOGOUT
  async logout(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Token não informado" });

    await RefreshTokenModel.removeByToken(refreshToken);
    res.json({ message: "Logout realizado com sucesso" });
  },

  // OBTER USUÁRIO LOGADO
  async get(req: Request, res: Response) {
    const userId = (req as any).user.id;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    res.json({ user });
  },

  // CRIAR USUÁRIO
  async create(req: Request, res: Response) {
    const { name, email, password, phone, role_id } = req.body;
    const existing = await UserModel.findByEmail(email);
    if (existing) return res.status(400).json({ message: "Email já cadastrado" });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password_hash, phone, role_id });
    res.status(201).json(user);
  },

  // ATUALIZAR USUÁRIO
  async update(req: Request, res: Response) {
    const userId = Number(req.params.id);
    const authUser = (req as any).user;

    if (!authUser || authUser.id !== userId) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const { name, phone } = req.body;
    const user = await UserModel.update(userId, { name, phone });
    res.json(user);
  },

  // REMOVER USUÁRIO
  async remove(req: Request, res: Response) {
    const userId = Number(req.params.id);
    const authUser = (req as any).user;

    if (!authUser || authUser.id !== userId) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    await UserModel.remove(userId);
    res.json({ message: "Usuário removido com sucesso" });
  },

  // ALTERAR SENHA
  async changePassword(req: Request, res: Response) {
    const userId = Number(req.params.id);
    const { oldPassword, newPassword } = req.body;
    const authUser = (req as any).user;

    if (!authUser || authUser.id !== userId) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const valid = await bcrypt.compare(oldPassword, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: "Senha atual incorreta" });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await UserModel.update(userId, { password_hash: newHash });

    res.json({ message: "Senha alterada com sucesso" });
  }
};
