import { round } from '@/utils/functions/round';

export const calculateOneRepMax = (weight: number, reps: number) =>
  round(weight * reps * 0.033333 + Number(weight), 0.5);
