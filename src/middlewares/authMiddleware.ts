import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token não fornecido" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || "supersecret");
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" });
  }
}
