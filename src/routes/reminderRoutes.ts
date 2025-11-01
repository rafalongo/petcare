import { Router } from "express";
import { ReminderController } from "../controllers/reminderController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/reminders", authenticateToken, ReminderController.list);
router.get("/reminders/:id", authenticateToken, ReminderController.show);
router.post("/reminders", authenticateToken, ReminderController.create);
router.put("/reminders/:id", authenticateToken, ReminderController.update);
router.delete("/reminders/:id", authenticateToken, ReminderController.remove);

export default router;
