import express from "express";
import { PetMedicationController } from "../controllers/petMedicationController";

const router = express.Router();

router.get("/pet-medications", PetMedicationController.getAll);
router.get("/pet-medications/:id", PetMedicationController.getById);
router.get("/pet-medications/pet/:pet_id", PetMedicationController.getByPetId);
router.post("/pet-medications", PetMedicationController.create);
router.put("/pet-medications/:id", PetMedicationController.update);
router.delete("/pet-medications/:id", PetMedicationController.delete);

export default router;
