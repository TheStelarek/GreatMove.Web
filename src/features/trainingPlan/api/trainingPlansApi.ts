import { api } from '@/store/api/api';
import { TrainingPlan } from '@/features/trainingPlan/utils/types/TrainingPlan';
import { TrainingType } from '@/features/trainingPlan/utils/types/TrainingType';

export const trainingPlansApi = api.injectEndpoints({
   endpoints: (build) => ({
      getTrainingPlanById: build.query<TrainingPlan, string>({
         query: (trainingPlanId) => ({
            url: `/training-plans/${trainingPlanId}`,
            method: `get`,
         }),
      }),
      deleteTrainingPlan: build.mutation<string, { trainingPlanId: string }>({
         query: (trainingPlanFormData) => ({
            url: `/training-plans/${trainingPlanFormData.trainingPlanId}`,
            method: `delete`,
         }),
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
      }),
   }),
});

export const { useDeleteTrainingPlanMutation, useSaveTrainingPlanMutation, useGetTrainingPlanByIdQuery } =
   trainingPlansApi;
