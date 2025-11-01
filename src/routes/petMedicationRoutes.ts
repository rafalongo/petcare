import { Router } from "express";
import { PetMedicationController } from "../controllers/petMedicationController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/pet-medications", authenticateToken, PetMedicationController.getAll);
router.get("/pet-medications/:id", authenticateToken, PetMedicationController.getById);
router.get("/pet-medications/pet/:pet_id", authenticateToken, PetMedicationController.getByPetId);
router.post("/pet-medications", authenticateToken, PetMedicationController.create);
router.put("/pet-medications/:id", authenticateToken, PetMedicationController.update);
router.delete("/pet-medications/:id", authenticateToken, PetMedicationController.delete);

export default router;
