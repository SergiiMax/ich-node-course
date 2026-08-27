import 'dotenv/config';
import jwt, { type SignOptions } from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
    throw new Error('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set in .env');
}

// access живёт мало: если его украли — окно атаки минимальное
const ACCESS_EXPIRES_IN = (process.env.JWT_ACCESS_EXPIRES_IN ?? '15m') as SignOptions['expiresIn'];
// refresh живёт долго, но лежит в httpOnly-куке с узким path
const REFRESH_EXPIRES_IN = (process.env.JWT_REFRESH_EXPIRES_IN ?? '7d') as SignOptions['expiresIn'];

export interface TokenPayload {
    id: number;
    email: string;
    name: string;
}

export function signAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, ACCESS_SECRET!, { expiresIn: ACCESS_EXPIRES_IN, algorithm: 'HS256' });
}

export function signRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, REFRESH_SECRET!, { expiresIn: REFRESH_EXPIRES_IN, algorithm: 'HS256' });
}

export function verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, ACCESS_SECRET!, { algorithms: ['HS256'] }) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, REFRESH_SECRET!, { algorithms: ['HS256'] }) as TokenPayload;
}
