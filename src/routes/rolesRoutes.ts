import express from 'express';
import { RolesController } from '../controllers/rolesController';

const router = express.Router();

router.get('/roles', RolesController.getAll);
router.get('/roles/:id', RolesController.getById);
router.post('/roles', RolesController.create);
router.put('/roles/:id', RolesController.update);
router.delete('/roles/:id', RolesController.delete);

export default router;
