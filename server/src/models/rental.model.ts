import mongoose, { Document } from 'mongoose';

export interface IRental extends Document {
  userId: string;
  carId: string;
  extras?: string[];
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}

const rentalSchema = new mongoose.Schema<IRental>({
  userId: { type: String, required: true },
  carId: { type: String, required: true },
  extras: { type: [String], default: [] },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
});

export const Rental = mongoose.model<IRental>('Rental', rentalSchema);
