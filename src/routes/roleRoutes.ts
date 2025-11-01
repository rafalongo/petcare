import { Router } from "express";
import { RoleController } from "../controllers/roleController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { checkRole } from "../middlewares/roleMiddleware";

const router = Router();

// Somente admin pode criar/editar/remover roles
router.get("/roles", authenticateToken, checkRole([1, 2]), RoleController.list);
router.get("/roles/:id", checkRole([1, 2]), authenticateToken, RoleController.show);
router.post("/roles", checkRole([1]), authenticateToken, RoleController.create);
router.put("/roles/:id", checkRole([1]), authenticateToken, RoleController.update);
router.delete("/roles/:id", checkRole([1]), authenticateToken, RoleController.remove);

export default router;
