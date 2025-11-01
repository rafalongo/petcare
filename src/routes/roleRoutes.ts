import { Router } from "express";
import { RoleController } from "../controllers/roleController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { checkRole } from "../middlewares/roleMiddleware";

const router = Router();

// Somente admin pode criar/editar/remover roles
router.get("/roles", authenticateToken, checkRole(["admin", "manager"]), RoleController.list);
router.get("/roles/:id", checkRole(["admin", "manager"]), authenticateToken, RoleController.show);
router.post("/roles", checkRole(["admin"]), authenticateToken, RoleController.create);
router.put("/roles/:id", checkRole(["admin"]), authenticateToken, RoleController.update);
router.delete("/roles/:id", checkRole(["admin"]), authenticateToken, RoleController.remove);

export default router;
