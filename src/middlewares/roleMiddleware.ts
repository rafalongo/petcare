import { Request, Response, NextFunction } from "express";

export function checkRole(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = (req as any).user?.role.name; // assumindo que req.user vem do authMiddleware

        console.log(userRole);

        if (!userRole) {
            return res.status(403).json({ error: "Permissão negada: sem role definida." });
        }

        if (userRole != "admin") {
            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({ error: "Acesso negado: role insuficiente." });
            }
        }

        next();
    };
}
