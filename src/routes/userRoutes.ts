import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", UserController.login);
router.post("/users", UserController.create);
router.get("/users", authenticateToken, UserController.get);
router.put("/users/:id", authenticateToken, UserController.update);
router.put("/users/:id/password", authenticateToken, UserController.changePassword);
router.delete("/users/:id", authenticateToken, UserController.remove);

export default router;
