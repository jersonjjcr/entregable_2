import { Request, Response } from 'express';
import { getAllUsers, deleteUserService as deleteUserServiceImpl, getUserByIdService, updateUserService } from '../service/user.service';

export const getUsers = async (_req: Request, res: Response) => {
    const users = await getAllUsers();
    res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const user = await updateUserService(id, req.body);
        res.json(user);
    } catch (error) {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        await deleteUserServiceImpl(id);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
};
