import { ExerciseDetailsType } from '@/features/trainingPlan/utils/types/ExerciseDetailsType';

export interface TrainingDayExercise {
   id: string;
   exercise: { id: string; name: string };
   details: ExerciseDetailsType[];
}
