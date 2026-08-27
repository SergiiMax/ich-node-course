import User from "../db/models/user.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { REFRESH_COOKIE, clearAuthCookies, setAuthCookies } from "../utils/cookies.js";
import type { Request, Response } from "express";

interface RegisterBody {
    username: string;
    email: string;
    password: string;
}

interface LoginBody {
    email: string;
    password: string;
}

function issueSession(res: Response, user: { id: number; email: string; username: string }) {
    const payload = { id: user.id, email: user.email, name: user.username };
    setAuthCookies(res, signAccessToken(payload), signRefreshToken(payload));
}

export const registerUser = async (req: Request<unknown, unknown, RegisterBody>, res: Response) => {

    try {
        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({error: 'name, email and password are required'});
        }

        const exists = await User.findOne({where: {email}});
        if (exists) {
            return res.status(409).json({error: 'User with these email already exists'});
        }

        const user = await User.create({username, email, password});

        issueSession(res, user);
        // токен в теле НЕ отдаём — он уже в httpOnly куке
        return res.status(201).json({user: user.toJSON()});
    } catch (error) {
        return res.status(500).json({
            error: 'Something went wrong',
            message: (error as Error).message
        });
    }
}

export const loginUser = async (req: Request<unknown, unknown, LoginBody>, res: Response) => {

    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({error: 'email or password are required'});
        }

        const user = await User.findOne({where: {email}});
        // одинаковый ответ на «нет юзера» и «неверный пароль» — чтобы не выдавать наличие email
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({error: 'Wrong email or password'});
        }

        issueSession(res, user);
        return res.json({user: user.toJSON()});
    } catch (e) {
        return res.status(500).json({
            error: 'Something went wrong',
            message: (e as Error).message
        });
    }
}

// фронт не может прочитать httpOnly куку, поэтому «кто я» спрашивает у сервера
export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.user!.id);
        if (!user) {
            clearAuthCookies(res);
            return res.status(401).json({error: 'Not authenticated'});
        }
        return res.json({user: user.toJSON()});
    } catch (e) {
        return res.status(500).json({
            error: 'Something went wrong',
            message: (e as Error).message
        });
    }
}

// обменять refresh-куку на новую пару токенов
export const refresh = async (req: Request, res: Response) => {
    const token = req.cookies?.[REFRESH_COOKIE];

    if (!token) {
        return res.status(401).json({error: 'No refresh token'});
    }

    try {
        const payload = verifyRefreshToken(token);
        const user = await User.findByPk(payload.id);

        if (!user) {
            clearAuthCookies(res);
            return res.status(401).json({error: 'Not authenticated'});
        }

        issueSession(res, user);
        return res.json({user: user.toJSON()});
    } catch {
        clearAuthCookies(res);
        return res.status(401).json({error: 'Invalid or expired refresh token'});
    }
}

// logout = сервер гасит куки; сам по себе фронт этого сделать не может
export const logout = async (_req: Request, res: Response) => {
    clearAuthCookies(res);
    return res.status(200).json({ok: true});
}
