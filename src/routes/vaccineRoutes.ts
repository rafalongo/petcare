import { Router } from "express";
import { VaccineController } from "../controllers/vaccineController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/vaccine", authenticateToken, VaccineController.getAll);
router.get("/vaccine/:id", authenticateToken, VaccineController.getById);
router.post("/vaccine", authenticateToken, VaccineController.create);
router.put("/vaccine/:id", authenticateToken, VaccineController.update);
router.delete("/vaccine/:id", authenticateToken, VaccineController.delete);

export default router;
