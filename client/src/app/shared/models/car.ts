export interface Car {
  _id?: string;
  imageUrl: string;
  brand: string;
  modelName: string;
  dailyPrice: number;
  availableFrom: Date;
  availableTo: Date;
}
