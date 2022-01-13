import type { AddExerciseFormValue } from '@/features/exercise/components/addExerciseModal/AddExerciseFormValue';
import { api } from '@/store/api/api';

export const exercisesApi = api.injectEndpoints({
   endpoints: (build) => ({
      addExercise: build.mutation<string, AddExerciseFormValue>({
         query: (exerciseFormData) => ({
            url: `/exercises`,
            method: `post`,
            data: {
               name: exerciseFormData.name,
               typeName: exerciseFormData.type,
            },
         }),
      }),
      updateExercise: build.mutation<string, AddExerciseFormValue & { exerciseId: string }>({
         query: (exerciseFormData) => ({
            url: `/exercises/${exerciseFormData.exerciseId}`,
            method: `patch`,
            data: {
               name: exerciseFormData.name,
               type: exerciseFormData.type,
            },
         }),
      }),
      deleteExercise: build.mutation<string, { exerciseId: string }>({
         query: (exerciseFormData) => ({
            url: `/exercises/${exerciseFormData.exerciseId}`,
            method: `delete`,
         }),
      }),
   }),
});

export const { useAddExerciseMutation, useUpdateExerciseMutation, useDeleteExerciseMutation } = exercisesApi;
