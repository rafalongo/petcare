import { Request, Response } from "express";
import { RoleModel } from "../models/roleModel";

export const RoleController = {
    async list(req: Request, res: Response) {
        try {
            const roles = await RoleModel.findAll();
            res.json(roles);
        } catch (err) {
            res.status(500).json({ error: "Erro ao listar roles." });
        }
    },

    async show(req: Request, res: Response) {
        try {
            const role = await RoleModel.findById(Number(req.params.id));
            if (!role) return res.status(404).json({ error: "Role não encontrada." });
            res.json(role);
        } catch {
            res.status(500).json({ error: "Erro ao buscar role." });
        }
    },

    async create(req: Request, res: Response) {
        try {
            const { name, description } = req.body;

            const exists = await RoleModel.findByName(name);
            if (exists) return res.status(400).json({ error: "Role já existe." });

            const role = await RoleModel.create({ name, description });
            res.status(201).json(role);
        } catch {
            res.status(500).json({ error: "Erro ao criar role." });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const existing = await RoleModel.findById(Number(id));
            if (!existing) return res.status(404).json({ error: "Role não encontrada." });

            await RoleModel.update(Number(id), req.body);
            res.json({ message: "Role atualizada com sucesso." });
        } catch {
            res.status(500).json({ error: "Erro ao atualizar role." });
        }
    },

    async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await RoleModel.delete(Number(id));
            res.json({ message: "Role removida com sucesso." });
        } catch {
            res.status(500).json({ error: "Erro ao remover role." });
        }
    },
};
