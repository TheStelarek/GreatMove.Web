import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { apiClient } from '@/api/apiClient';
import { ExerciseType } from '@/features/trainingPlan/utils/types/ExerciseType';

export default function useExercises() {
   const [exercises, setExercises] = useState<ExerciseType[]>();
   const [pageCount, setPageCount] = useState(0);
   const [error, setError] = useState<string>(``);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const fetchExercises = useCallback(async (pageSize: number, pageIndex: number) => {
      try {
         setIsLoading(true);
         const response = await apiClient.get(`/exercises/user?take=${pageSize}&skip=${pageIndex * pageSize}`);

         const mappedData = response.data.data.map((exercise: ExerciseType, index: number) => ({
            ...exercise,
            number: index + 1,
         }));

         const pagesCount = Math.ceil(response.data.total / pageSize);
         setIsLoading(false);
         setExercises(mappedData);
         setPageCount(pagesCount === 0 ? 1 : pagesCount);
      } catch (axiosError) {
         const err = axiosError as AxiosError;
         setIsLoading(false);
         setError(err.response?.data.message);
      }
   }, []);

   return { exercises, pageCount, error, isLoading, fetchExercises };
}
