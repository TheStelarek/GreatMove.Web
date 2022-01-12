import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import MyRecipesContainer from '@/features/recipe/containers/myRecipesContainer/MyRecipesContainer';

const MyRecipes: NextApplicationPage = () => <MyRecipesContainer />;

export default MyRecipes;

MyRecipes.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

MyRecipes.requireAuth = true;
