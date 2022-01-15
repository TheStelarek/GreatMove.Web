import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import TrainingPlanContainer from '@/features/trainingPlan/containers/trainingPlanContainer/TrainingPlanContainer';

const TrainingPlan: NextApplicationPage = () => <TrainingPlanContainer />;

export default TrainingPlan;

TrainingPlan.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};
