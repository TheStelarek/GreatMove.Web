import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { apiClient } from '@/api/apiClient';

export interface TrainingPlan {
   id: string;
   name: string;
   createdAt: string;
}

export default function useTrainingPlans() {
   const [plans, setPlans] = useState<TrainingPlan[]>();
   const [pageCount, setPageCount] = useState(0);
   const [error, setError] = useState<string>(``);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const fetchTrainingPlans = useCallback(async (pageSize: number, pageIndex: number) => {
      try {
         setIsLoading(true);
         const response = await apiClient.get(`/training-plans/my-plans?take=${pageSize}&skip=${pageIndex * pageSize}`);
         const mappedData = response.data.data.map((plan: TrainingPlan, index: number) => ({
            ...plan,
            createdAt: new Date(plan.createdAt).toLocaleDateString(),
            number: index + 1,
         }));

         const pagesCount = Math.ceil(response.data.total / pageSize);
         setIsLoading(false);
         setPlans(mappedData);
         setPageCount(pagesCount === 0 ? 1 : pagesCount);
      } catch (axiosError) {
         const err = axiosError as AxiosError;
         setIsLoading(false);
         setError(err.response?.data.message);
      }
   }, []);

   return { plans, pageCount, error, isLoading, fetchTrainingPlans };
}
