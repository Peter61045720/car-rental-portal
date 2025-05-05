import mongoose, { Document } from 'mongoose';

export interface IExtra extends Document {
  name: string;
  description: string;
  dailyPrice: number;
}

const extraSchema = new mongoose.Schema<IExtra>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dailyPrice: { type: Number, required: true },
});

export const Extra = mongoose.model<IExtra>('Extra', extraSchema);
