import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Post } from './post';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'varchar', length: 150, unique: true })
    email!: string;

    @Column({ type: 'varchar' })
    password!: string;

    @Column({ type: 'varchar', length: 20, default: 'user' })
    role!: string; // 'user' | 'admin'

    @OneToMany(() => Post, post => post.user)
    posts!: Post[];
}