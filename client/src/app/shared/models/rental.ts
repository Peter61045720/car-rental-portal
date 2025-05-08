export interface Rental {
  _id?: string;
  userId: string;
  carId: string;
  extras?: string[];
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}
