import { Router } from "express";
import { PetVaccineController } from "../controllers/petVaccineController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/pet-vaccine", authenticateToken, PetVaccineController.getAll);
router.get("/pet-vaccine/:id", authenticateToken, PetVaccineController.getById);
router.get("/pet-vaccine/pet/:petId", authenticateToken, PetVaccineController.getByPet);
router.post("/pet-vaccine", authenticateToken, PetVaccineController.create);
router.put("/pet-vaccine/:id", authenticateToken, PetVaccineController.update);
router.delete("/pet-vaccine/:id", authenticateToken, PetVaccineController.delete);

export default router;
