import { ExerciseType } from '@/features/trainingPlan/utils/types/ExerciseType';

export type TrainingType = {
   [x: string]: {
      name: string;
      items: ExerciseType[];
      id: string;
   };
};
