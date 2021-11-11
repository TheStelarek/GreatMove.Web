export type ExerciseDetailsType = {
   id: string;
   sets: number;
   reps: number;
   load?: string | number;
   rpe?: number;
   tempo?: string;
   rest?: string;
   comment?: string;
};
