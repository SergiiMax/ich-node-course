import { Balance } from '../models/Balance.js';
import { Request, Response } from 'express';

// Находим документ с балансом. Если его ещё нет — создаём с нулём.
async function getBalanceDoc() {
  let balance = await Balance.findOne();
  if (!balance) {
    balance = await Balance.create({ amount: 0 });
  }
  return balance;
}

// Проверяем сумму, которую прислал пользователь.
function checkAmount(value: unknown): number {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Поле "amount" должно быть числом больше нуля');
  }
  return amount;
}

export async function showBalance (req: Request, res: Response) {
  const balance = await getBalanceDoc();
  res.json({ balance: balance.amount });
};

export async function sentMoney(req: Request, res: Response) {
  try {
    const amount = checkAmount(req.body.amount);

    const balance = await getBalanceDoc();
    balance.amount += amount;
    await balance.save();

    res.json({ balance: balance.amount });
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

export async function expenseMoney(req: Request, res: Response){
  try {
    const amount = checkAmount(req.body.amount);

    const balance = await getBalanceDoc();
    if (amount > balance.amount) {
      throw new Error(`Недостаточно средств. На счету ${balance.amount}`);
    }

    balance.amount -= amount;
    await balance.save();

    res.json({ balance: balance.amount });
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}