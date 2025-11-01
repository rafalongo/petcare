import { Router } from "express";
import { AttachmentController } from "../controllers/attachmentController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

router.get("/attachments/pets/:petId", authenticateToken, AttachmentController.listByPet);
router.get("/attachments/:id", authenticateToken, AttachmentController.show);
router.post("/attachments/pets/:petId", upload.single("file"), authenticateToken, AttachmentController.upload);
router.delete("/attachments/:id", authenticateToken, AttachmentController.remove);

export default router;
