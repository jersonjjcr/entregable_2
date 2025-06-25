import { AppDataSource } from '../../ormconfig';
import { User } from '../entities/user';

export const getAllUsers = async () => {
    const repo = AppDataSource.getRepository(User);
    return await repo.find();
};

export const getUserByIdService = async (id: number) => {
    const repo = AppDataSource.getRepository(User);
    return await repo.findOneBy({ id });
};

export const createUserService = async (name: string, email: string, password: string, role: string = 'user') => {
    const userRepo = AppDataSource.getRepository(User);
    const user = userRepo.create({ name, email, password, role });
    return await userRepo.save(user);
};

export const updateUserService = async (id: number, data: Partial<User>) => {
    const repo = AppDataSource.getRepository(User);
    let user = await repo.findOneBy({ id });
    if (!user) throw new Error('Usuario no encontrado');
    user = Object.assign(user, data);
    return await repo.save(user);
};

export const findUserByEmail = async (email: string) => {
    return await AppDataSource.getRepository(User).findOneBy({ email });
};

export const deleteUserService = async (id: number) => {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ id });
    if (!user) throw new Error('Usuario no encontrado');
    await repo.remove(user);
};
