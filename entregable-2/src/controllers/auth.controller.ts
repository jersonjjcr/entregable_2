import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { CreateUserDto } from '../dtos/user.dto';
import { createUserService, findUserByEmail } from '../service/user.service';
import { generateToken } from '../utils/token';

export const register = async (req: Request, res: Response) => {
    try {
        const dto = new CreateUserDto();
        Object.assign(dto, req.body);
        const errors = await validate(dto);
        if (errors.length > 0) return res.status(400).json(errors);

        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await createUserService(dto.name, dto.email, hashedPassword, dto.role || 'user');
        res.status(201).json(user);
    } catch {
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token });
};