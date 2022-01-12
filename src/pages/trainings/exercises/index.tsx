import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import ExerciseTableContainer from '@/features/exercise/containers/exerciseTableContainer/ExerciseTableContainer';

const Exercises: NextApplicationPage = () => <ExerciseTableContainer />;

export default Exercises;

Exercises.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

Exercises.requireAuth = true;
