import { api } from '@/store/api/api';
import { Exercise } from '@/features/exercise/utils/types/Exercise';
import type { AddExerciseFormValue } from '@/features/exercise/components/addExerciseModal/AddExerciseFormValue';

export const exercisesApi = api.injectEndpoints({
   endpoints: (build) => ({
      getExercises: build.query<{ data: Exercise[]; total: number }, { pageSize: number; pageIndex: number }>({
         query: ({ pageSize, pageIndex }) => ({
            url: `/exercises/user?take=${pageSize}&skip=${pageIndex * pageSize}`,
            method: `get`,
         }),
         providesTags: [`Exercises`],
      }),
      addExercise: build.mutation<string, AddExerciseFormValue>({
         query: (exerciseFormData) => ({
            url: `/exercises`,
            method: `post`,
            data: {
               name: exerciseFormData.name,
               typeName: exerciseFormData.type,
            },
         }),
         invalidatesTags: (result, error) => (error ? [] : [`Exercises`]),
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
         invalidatesTags: (result, error) => (error ? [] : [`Exercises`]),
      }),
      deleteExercise: build.mutation<string, { exerciseId: string }>({
         query: (exerciseFormData) => ({
            url: `/exercises/${exerciseFormData.exerciseId}`,
            method: `delete`,
         }),
         invalidatesTags: (result, error) => (error ? [] : [`Exercises`]),
      }),
   }),
});

export const { useGetExercisesQuery, useAddExerciseMutation, useUpdateExerciseMutation, useDeleteExerciseMutation } =
   exercisesApi;
