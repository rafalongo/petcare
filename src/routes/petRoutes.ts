import { Router } from "express";
import { PetController } from "../controllers/petController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/pets", authenticateToken, PetController.create);
router.get("/pets", authenticateToken, PetController.getAll);
router.get("/pets/:id", authenticateToken, PetController.getById);
router.put("/pets/:id", authenticateToken, PetController.update);
router.delete("/pets/:id", authenticateToken, PetController.delete);

export default router;
