import express from "express";
import { MedicationController } from "../controllers/medicationController";

const router = express.Router();

router.get("/medications", MedicationController.getAll);
router.get("/medications/:id", MedicationController.getById);
router.post("/medications", MedicationController.create);
router.put("/medications/:id", MedicationController.update);
router.delete("/medications/:id", MedicationController.delete);

export default router;
