import { AppDataSource } from '../../ormconfig';
import { Post } from '../entities/post';
import { User } from '../entities/user';

export const createNewPost = async (title: string, description: string, userId: number) => {
    const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    const repo = AppDataSource.getRepository(Post);
    const post = repo.create({ title, description, user });
    return await repo.save(post);
};

export const getAllPosts = async () => {
    return await AppDataSource.getRepository(Post).find({ relations: ['user'] });
};
