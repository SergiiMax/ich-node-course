import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken, type TokenPayload } from '../utils/jwt.js';
import { ACCESS_COOKIE } from '../utils/cookies.js';

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

export function auth(req: Request, res: Response, next: NextFunction) {
    // основной способ — httpOnly кука
    let token: string | undefined = req.cookies?.[ACCESS_COOKIE];

    // запасной — Bearer-заголовок (удобно для Postman / мобильных клиентов)
    const header = req.headers.authorization;
    if (!token && header?.startsWith('Bearer ')) {
        token = header.slice('Bearer '.length);
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
        req.user = verifyAccessToken(token);
        next();
    } catch {
        // 401 -> фронт попробует дёрнуть /api/auth/refresh
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}
