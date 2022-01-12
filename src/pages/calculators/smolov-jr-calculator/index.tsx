import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import SmolovJrCalculatorContainer from '@/features/calculator/containers/smolovJrCalculatorContainer/SmolovJrCalculatorContainer';

const SmolovJrCalculator = () => <SmolovJrCalculatorContainer />;

SmolovJrCalculator.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

export default SmolovJrCalculator;
