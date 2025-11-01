import { Request, Response, NextFunction } from "express";

export function checkRole(allowedRoles: number[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log("AQUI AQUI AQUI", (req as any).user);
        const userRole = (req as any).user?.role_id; // assumindo que req.user vem do authMiddleware

        if (!userRole) {
            return res.status(403).json({ error: "Permissão negada: sem role definida." });
        }

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ error: "Acesso negado: role insuficiente." });
        }

        next();
    };
}
