import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import CreateTrainingPlanContainer from '@/features/trainingPlan/containers/createTrainingPlanContainer/CreateTrainingPlanContainer';

const CreateTrainingPlan = () => <CreateTrainingPlanContainer />;

export default CreateTrainingPlan;

CreateTrainingPlan.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

CreateTrainingPlan.requireAuth = true;
