import { ReactElement } from 'react';
import Layout from '@/components/core/layout/Layout';
import CreateTrainingPlanContainer from '@/features/trainingPlan/containers/createTrainingPlanContainer/CreateTrainingPlanContainer';

const CreateTrainingPlan = () => <CreateTrainingPlanContainer />;

export default CreateTrainingPlan;

CreateTrainingPlan.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};
