import { DataSource } from 'typeorm';
import { User } from './src/entities/user';
import { Post } from './src/entities/post';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'clave1',
    database: process.env.DB_NAME || 'petposts',
    synchronize: true,
    logging: false,
    entities: [User, Post],
});