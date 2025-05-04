import mongoose, { Document } from 'mongoose';

export interface ICar extends Document {
  imageUrl: string;
  brand: string;
  modelName: string;
  dailyPrice: number;
  availableFrom: Date;
  availableTo: Date;
}

const carSchema = new mongoose.Schema<ICar>({
  imageUrl: { type: String, required: true },
  brand: { type: String, required: true },
  modelName: { type: String, required: true },
  dailyPrice: { type: Number, required: true },
  availableFrom: { type: Date, required: true },
  availableTo: { type: Date, required: true },
});

export const Car = mongoose.model<ICar>('Car', carSchema);
