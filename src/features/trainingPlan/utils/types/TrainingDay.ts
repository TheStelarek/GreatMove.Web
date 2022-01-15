import { TrainingDayExercise } from '@/features/trainingPlan/utils/types/TrainingDayExercise';

export interface TrainingDay {
   id: string;
   name: string;
   items: TrainingDayExercise[];
}
