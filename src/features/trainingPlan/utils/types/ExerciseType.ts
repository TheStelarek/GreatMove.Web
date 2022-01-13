import { ExerciseDetailsType } from '@/features/trainingPlan/utils/types/ExerciseDetailsType';

export type ExerciseType = {
   id: string;
   exerciseId: string;
   name: string;
   details: ExerciseDetailsType[];
};
