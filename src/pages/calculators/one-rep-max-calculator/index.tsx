import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import OneRepMaxCalculatorContainer from '@/features/calculator/containers/oneRepMaxCalculatorContainer/OneRepMaxCalculatorContainer';

const OneRepMaxCalculator = () => <OneRepMaxCalculatorContainer />;

OneRepMaxCalculator.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

export default OneRepMaxCalculator;
