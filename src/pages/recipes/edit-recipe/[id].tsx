import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import EditRecipeContainer from '@/features/recipe/containers/editRecipeContainer/EditRecipeContainer';

const EditRecipe = () => <EditRecipeContainer />;

export default EditRecipe;

EditRecipe.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

EditRecipe.requireAuth = true;
