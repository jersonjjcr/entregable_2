import { Router } from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth';
import { adminOrOwner } from '../middleware/role';

const router = Router();

router.get('/', authMiddleware, getUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, adminOrOwner(async req => Number(req.params.id)), updateUser);
router.delete('/:id', authMiddleware, adminOrOwner(async req => Number(req.params.id)), deleteUser);

export default router;