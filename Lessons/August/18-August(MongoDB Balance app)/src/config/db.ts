import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB Connected!');
  } catch (e) {
    console.error((e as Error).message);
    throw e;
  }
};