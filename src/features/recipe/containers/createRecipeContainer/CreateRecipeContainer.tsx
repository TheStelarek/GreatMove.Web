import { useState } from 'react';
import CreateRecipeBox from '@/features/recipe/components/create-recipe/createRecipeBox/CreateRecipeBox';
import styles from '@/features/recipe/containers/createRecipeContainer/CreateRecipeContainer.module.scss';
import CreateRecipeForm from '@/features/recipe/components/create-recipe/createRecipeForm/CreateRecipeForm';

const CreateRecipeContainer = () => {
   const [isCreatingRecipe, setIsCreatingRecipe] = useState(false);
   const showForm = () => setIsCreatingRecipe((prevState) => !prevState);

   return (
      <div className={styles.createRecipeContainer}>
         {isCreatingRecipe ? <CreateRecipeForm /> : <CreateRecipeBox create={showForm} />}
      </div>
   );
};

export default CreateRecipeContainer;
