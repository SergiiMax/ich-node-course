import { Router } from 'express';
import { Balance } from '../models/Balance.js';
import { expenseMoney, sentMoney, showBalance } from '../controllers/balanceController.js';

export const router = Router();

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

// 1. Текущий баланс
router.get('/balance', showBalance);

// 2. Пополнение
router.post('/balance/income', sentMoney);

// 3. Расход
router.post('/balance/expense', expenseMoney);