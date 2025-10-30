import express from "express";
import { VaccineController } from "../controllers/vaccineController";

const router = express.Router();

router.get("/vaccine", VaccineController.getAll);
router.get("/vaccine/:id", VaccineController.getById);
router.post("/vaccine", VaccineController.create);
router.put("/vaccine/:id", VaccineController.update);
router.delete("/vaccine/:id", VaccineController.delete);

export default router;
