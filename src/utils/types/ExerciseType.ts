import { ExerciseDetailsType } from '@/utils/types/ExerciseDetailsType';

export type ExerciseType = {
   id: string;
   name: string;
   details: ExerciseDetailsType[];
};
