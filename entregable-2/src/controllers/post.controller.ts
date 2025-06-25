import { Request, Response } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Post } from '../entities/post';
import { User } from '../entities/user';

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, description, userId } = req.body;
        const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const postRepo = AppDataSource.getRepository(Post);
        const post = postRepo.create({ title, description, user });
        await postRepo.save(post);

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Post creation failed' });
    }
};

export const getPosts = async (_req: Request, res: Response) => {
    const posts = await AppDataSource.getRepository(Post).find({ relations: ['user'] });
    res.json(posts);
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const postRepo = AppDataSource.getRepository(Post);
        const post = await postRepo.findOne({ where: { id: Number(req.params.id) }, relations: ['user'] });
        if (!post) return res.status(404).json({ error: 'Publicación no encontrada' });
        const { title, description } = req.body;
        if (title !== undefined) post.title = title;
        if (description !== undefined) post.description = description;
        await postRepo.save(post);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la publicación' });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const postRepo = AppDataSource.getRepository(Post);
        const post = await postRepo.findOne({ where: { id: Number(req.params.id) }, relations: ['user'] });
        if (!post) return res.status(404).json({ error: 'Publicación no encontrada' });
        await postRepo.remove(post);
        res.json({ message: 'Publicación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la publicación' });
    }
};