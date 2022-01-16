import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import HomaCalculatorContainer from '@/features/calculator/containers/homaCalculatorContainer/HomaCalculatorContainer';

const HomaCalculator = () => <HomaCalculatorContainer />;

HomaCalculator.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

export default HomaCalculator;
