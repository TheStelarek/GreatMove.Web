import { round } from './round';

export const calculateSmolovJrWeek = (max: number, increment: number) => [
   {
      day: `Monday`,
      sets: 6,
      reps: 6,
      weight: round(max * 0.7 + increment, 0.5),
   },
   {
      day: `Wednesday`,
      sets: 7,
      reps: 5,
      weight: round(max * 0.75 + increment, 0.5),
   },
   {
      day: `Friday`,
      sets: 8,
      reps: 4,
      weight: round(max * 0.8 + increment, 0.5),
   },
   {
      day: `Saturday`,
      sets: 10,
      reps: 3,
      weight: round(max * 0.85 + increment, 0.5),
   },
];
