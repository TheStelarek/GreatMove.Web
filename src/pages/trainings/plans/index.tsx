import { ReactElement } from 'react';
import Layout from '@/components/core/layout/Layout';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';

import TrainingPlansTableContainer from '@/features/trainingPlan/containers/trainingPlansTableContainer/TrainingPlansTableContainer';

const TrainingPlans: NextApplicationPage = () => <TrainingPlansTableContainer />;

export default TrainingPlans;

TrainingPlans.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};

TrainingPlans.requireAuth = true;
