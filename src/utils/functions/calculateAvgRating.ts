import { Rating } from '@/utils/types/Rating';
import { round } from '@/utils/functions/round';

export const calculateAvgRating = (groupedRating: Rating, total: number) => {
   const avg = round(
      (groupedRating[`1`] * 1 +
         groupedRating[`2`] * 2 +
         groupedRating[`3`] * 3 +
         groupedRating[`4`] * 4 +
         groupedRating[`5`] * 5) /
         total,
      0.01,
   );

   return Number.isNaN(avg) ? 0 : avg;
};
