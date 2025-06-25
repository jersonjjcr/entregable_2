import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { adminOrOwner } from '../middleware/role';
import { AppDataSource } from '../../ormconfig';
import { Post } from '../entities/post';
import * as postController from '../controllers/post.controller';

const router = Router();

router.post('/', authMiddleware, postController.createPost);
router.get('/', postController.getPosts);

// Endpoint para actualizar publicación (solo admin o creador)
router.put('/:id', authMiddleware, adminOrOwner(async (req) => {
    const postRepo = AppDataSource.getRepository(Post);
    const post = await postRepo.findOne({ where: { id: Number(req.params.id) }, relations: ['user'] });
    if (!post || !post.user || typeof post.user.id !== 'number') throw new Error('Publicación no encontrada');
    return post.user.id;
}), postController.updatePost);

// Endpoint para eliminar publicación (solo admin o creador)
router.delete('/:id', authMiddleware, adminOrOwner(async (req) => {
    const postRepo = AppDataSource.getRepository(Post);
    const post = await postRepo.findOne({ where: { id: Number(req.params.id) }, relations: ['user'] });
    if (!post || !post.user || typeof post.user.id !== 'number') throw new Error('Publicación no encontrada');
    return post.user.id;
}), postController.deletePost);

export default router;