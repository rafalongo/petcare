import { Router } from "express";
import { MedicationController } from "../controllers/medicationController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/medications", authenticateToken, MedicationController.getAll);
router.get("/medications/:id", authenticateToken, MedicationController.getById);
router.post("/medications", authenticateToken, MedicationController.create);
router.put("/medications/:id", authenticateToken, MedicationController.update);
router.delete("/medications/:id", authenticateToken, MedicationController.delete);

export default router;
