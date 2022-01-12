import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import TmrCalculatorContainer from '@/features/calculator/containers/tmrCalculatorContainer/TmrCalculatorContainer';

const TMRCalculator = () => <TmrCalculatorContainer />;

TMRCalculator.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

export default TMRCalculator;
