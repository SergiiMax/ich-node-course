import { Schema, model } from 'mongoose';

const balanceSchema = new Schema({
  amount: { type: Number, required: true, default: 0 },
});

export const Balance = model('Balance', balanceSchema);