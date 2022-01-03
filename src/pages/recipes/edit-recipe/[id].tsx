import { ReactElement } from 'react';
import Layout from '@/components/core/layout/Layout';
import styles from '@/pages/recipes/create-recipe/CreateRecipe.module.scss';
import CreateRecipeForm from '@/components/create-recipe/createRecipeForm/CreateRecipeForm';
import { useRouter } from 'next/router';

const EditRecipe = () => {
   const router = useRouter();

   return (
      <div className={styles.createRecipeContainer}>
         <CreateRecipeForm recipeId={router.query.id as string} isAddMode={false} />
      </div>
   );
};

export default EditRecipe;

EditRecipe.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};
