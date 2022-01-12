import { useRouter } from 'next/router';
import styles from '@/features/recipe/containers/editRecipeContainer/EditRecipeContainer.module.scss';
import CreateRecipeForm from '@/features/recipe/components/create-recipe/createRecipeForm/CreateRecipeForm';

const EditRecipeContainer = () => {
   const router = useRouter();

   return (
      <div className={styles.createRecipeContainer}>
         <CreateRecipeForm recipeId={router.query.id as string} isAddMode={false} />
      </div>
   );
};

export default EditRecipeContainer;
