import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import CreateRecipeContainer from '@/features/recipe/containers/createRecipeContainer/CreateRecipeContainer';

const CreateRecipe = () => <CreateRecipeContainer />;

export default CreateRecipe;

CreateRecipe.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

CreateRecipe.requireAuth = true;
