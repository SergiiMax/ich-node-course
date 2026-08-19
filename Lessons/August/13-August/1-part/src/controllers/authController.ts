import { type Request, type Response } from 'express';
import User from '../db/models/user.js';
import { signToken } from '../utils/jwt.js';

interface RegisterBody {
  name?: string;
  email?: string;
  password?: string;
}

interface LoginBody {
  email?: string;
  password?: string;
}

export async function register(req: Request<unknown, unknown, RegisterBody>, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email и password обязательны' });
  }

  const exists = await User.findOne({ where: { email } });
  if (exists) {
    return res.status(409).json({ error: 'Пользователь с таким email уже существует' });
  }

  const user = await User.create({ name, email, password });
  const { password: _, ...safe } = user.toJSON();

  res.status(201).json({ user: safe, token: signToken({ id: user.id, email: user.email }) });
}

export async function login(req: Request<unknown, unknown, LoginBody>, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email и password обязательны' });
  }

  const user = await User.findOne({ where: { email } });
  // одинаковый ответ на «нет юзера» и «неверный пароль» — чтобы не выдавать наличие email
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Неверный email или пароль' });
  }

  const { password: _, ...safe } = user.toJSON();

  res.json({ user: safe, token: signToken({ id: user.id, email: user.email }) });
}

export async function logginedUser(req: Request, res: Response) {
  const user = await User.findByPk(req.user!.id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return res.status(404).json({ error: 'Пользователь не найден' });
  }

  res.json(user);
}