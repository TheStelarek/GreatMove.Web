import { ReactElement, useState } from 'react';
import Layout from '@/components/core/layout/Layout';
import CreateRecipeBox from '@/components/create-recipe/createRecipeBox/CreateRecipeBox';
import styles from '@/pages/recipes/create-recipe/CreateRecipe.module.scss';
import CreateRecipeForm from '@/components/create-recipe/createRecipeForm/CreateRecipeForm';

const CreateRecipe = () => {
   const [isCreatingRecipe, setIsCreatingRecipe] = useState(false);
   const showForm = () => setIsCreatingRecipe((prevState) => !prevState);

   return (
      <div className={styles.createRecipeContainer}>
         {isCreatingRecipe ? <CreateRecipeForm /> : <CreateRecipeBox create={showForm} />}
      </div>
   );
};

export default CreateRecipe;

CreateRecipe.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};
