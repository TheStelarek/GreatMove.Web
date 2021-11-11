import { ExerciseType } from '@/utils/types/ExerciseType';

export type TrainingType = {
   [x: string]: {
      name: string;
      items: ExerciseType[];
      id: string;
   };
};
