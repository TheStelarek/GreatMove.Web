import { TrainingDay } from '@/features/trainingPlan/utils/types/TrainingDay';

export interface TrainingPlan {
   id: string;
   name: string;
   userId: string;
   trainingDays: TrainingDay[];
}
