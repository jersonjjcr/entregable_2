import { Request, Response, NextFunction } from 'express';

// Permite solo a administradores o al creador del recurso (por id)
export const adminOrOwner = (getResourceUserId: (req: Request) => Promise<number> | number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user) return res.status(401).json({ error: 'No autorizado' });
        if (user.role === 'admin') return next();
        const resourceUserId = await getResourceUserId(req);
        if (user.id === resourceUserId) return next();
        return res.status(403).json({ error: 'Solo el creador o un administrador puede realizar esta acción' });
    };
};

export {};
