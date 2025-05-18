import { differenceInDays, startOfDay } from 'date-fns';
import { Extra } from '../models/extra';

export function calculateTotalPrice(
  dailyPrice: number,
  startDate: Date,
  endDate: Date,
  extras: Extra[]
): number {
  const rentalDays =
    differenceInDays(startOfDay(new Date(endDate)), startOfDay(new Date(startDate))) + 1;
  const extrasTotal = extras.reduce((acc, extra) => acc + extra.dailyPrice * rentalDays, 0);

  return dailyPrice * rentalDays + extrasTotal;
}
