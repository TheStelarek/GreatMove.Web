import { api } from '@/store/api/api';
import { TrainingPlan } from '@/features/trainingPlan/utils/types/TrainingPlan';
import { TrainingType } from '@/features/trainingPlan/utils/types/TrainingType';
import { TrainingPlanResponse } from '@/features/trainingPlan/utils/types/TrainingPlanResponse';

export const trainingPlansApi = api.injectEndpoints({
   endpoints: (build) => ({
      getTrainingPlanById: build.query<TrainingPlan, string>({
         query: (trainingPlanId) => ({
            url: `/training-plans/${trainingPlanId}`,
            method: `get`,
         }),
      }),
      getMyPlans: build.query<{ data: TrainingPlanResponse[]; total: number }, { pageSize: number; pageIndex: number }>(
         {
            query: ({ pageSize, pageIndex }) => ({
               url: `/training-plans/my-plans?take=${pageSize}&skip=${pageIndex * pageSize}`,
               method: `get`,
            }),
            providesTags: [`Plans`],
         },
      ),
      deleteTrainingPlan: build.mutation<string, { trainingPlanId: string }>({
         query: (trainingPlanFormData) => ({
            url: `/training-plans/${trainingPlanFormData.trainingPlanId}`,
            method: `delete`,
         }),
         invalidatesTags: (result, error) => (error ? [] : [`Plans`]),
      }),
      saveTrainingPlan: build.mutation<string, { name: string; training: TrainingType }>({
         query: ({ name, training }) => ({
            url: `/training-plans`,
            method: `post`,
            data: {
               name,
               trainingDays: Object.values(training),
            },
         }),
         invalidatesTags: (result, error) => (error ? [] : [`Plans`]),
      }),
   }),
});

export const {
   useGetMyPlansQuery,
   useDeleteTrainingPlanMutation,
   useSaveTrainingPlanMutation,
   useGetTrainingPlanByIdQuery,
} = trainingPlansApi;
