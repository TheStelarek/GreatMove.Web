import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import BmiCalculatorContainer from '@/features/calculator/containers/bmiCalculatorContainer/BmiCalculatorContainer';

const BMICalculator = () => <BmiCalculatorContainer />;

BMICalculator.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

export default BMICalculator;
