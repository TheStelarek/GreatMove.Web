import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import CalculatorsContainer from '@/features/calculator/containers/calculatorsContainer/CalculatorsContainer';

const Calculators = () => <CalculatorsContainer />;

Calculators.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

export default Calculators;
