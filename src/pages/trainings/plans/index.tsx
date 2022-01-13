import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import TrainingPlansTableContainer from '@/features/trainingPlan/containers/trainingPlansTableContainer/TrainingPlansTableContainer';

const TrainingPlans: NextApplicationPage = () => <TrainingPlansTableContainer />;

export default TrainingPlans;

TrainingPlans.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

TrainingPlans.requireAuth = true;
