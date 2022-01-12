import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import RecipeContainer from '@/features/recipe/containers/recipeContainer/RecipeContainer';

const Recipe: NextApplicationPage = () => <RecipeContainer />;

export default Recipe;

Recipe.getLayout = function getLayout(page: ReactElement) {
   return (
      <MainLayout navbarVariant="purple" navbarBoxShadow={false} fullWidth>
         {page}
      </MainLayout>
   );
};
