import express from "express";
import { PetVaccineController } from "../controllers/petVaccineController";

const router = express.Router();

router.get("/pet-vaccine", PetVaccineController.getAll);
router.get("/pet-vaccine/:id", PetVaccineController.getById);
router.get("/pet-vaccine/pet/:petId", PetVaccineController.getByPet);
router.post("/pet-vaccine", PetVaccineController.create);
router.put("/pet-vaccine/:id", PetVaccineController.update);
router.delete("/pet-vaccine/:id", PetVaccineController.delete);

export default router;
