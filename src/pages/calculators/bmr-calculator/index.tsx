import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import BmrCalculatorContainer from '@/features/calculator/containers/bmrCalculatorContainer/BmrCalculatorContainer';

const BMRCalculator = () => <BmrCalculatorContainer />;

BMRCalculator.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

export default BMRCalculator;
