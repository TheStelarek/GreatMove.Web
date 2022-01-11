import { TrainingType } from '@/features/trainingPlan/utils/types/TrainingType';
import { api } from '@/store/api/api';

export const trainingPlansApi = api.injectEndpoints({
   endpoints: (build) => ({
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

export const { useDeleteTrainingPlanMutation, useSaveTrainingPlanMutation } = trainingPlansApi;
