import { FC } from 'react';
import RecipeIngredients from '@/features/recipe/components/recipe/recipeIngredients/RecipeIngredients';
import RecipeSteps from '@/features/recipe/components/recipe/recipeSteps/RecipeSteps';
import RecipeTips from '@/features/recipe/components/recipe/recipeTips/RecipeTips';
import RecipeNourishment from '@/features/recipe/components/recipe/recipeNourishment/RecipeNourishment';
import RecipeShare from '@/features/recipe/components/recipe/recipeShare/RecipeShare';
import RecipeTime from '@/features/recipe/components/recipe/recipeTime/RecipeTime';
import RecipeReviews from '@/features/recipe/components/recipe/recipeReviews/RecipeReviews';
import styles from '@/features/recipe/components/recipe/recipeWrapper/RecipeWrapper.module.scss';
import { Recipe } from '@/features/recipe/utils/types/Recipe';

interface RecipeWrapperProps {
   recipe: Recipe;
}

const RecipeWrapper: FC<RecipeWrapperProps> = ({ recipe }) => (
   <div className={styles.recipeContainer}>
      <div className={styles.headerContainer}>
         <div className={styles.headerWrapper}>
            <div className={styles.headerContent}>
               <h1 className={styles.title}>{recipe.title}</h1>
               <div className={styles.timeWrapper}>
                  <RecipeTime prepTime={recipe.preparationTime} cookTime={recipe.cookTime} />
                  <RecipeShare />
               </div>
            </div>
         </div>
      </div>
      <div className={styles.recipeContent}>
         <div className={styles.leftContainer}>
            <p className={styles.recipeDescription}>{recipe.description}</p>
            <RecipeSteps steps={recipe.steps} />
            <RecipeNourishment
               calories={recipe.calories}
               proteins={recipe.proteins}
               carbs={recipe.carbs}
               fats={recipe.fats}
               fibre={recipe.fibre}
            />
            {recipe.tips && <RecipeTips tips={recipe.tips} />}
            <RecipeReviews
               authorId={recipe.userId}
               recipeId={recipe.id}
               reviews={recipe.reviews}
               groupedRating={recipe.groupedRating}
            />
         </div>
         <div className={styles.rightContainer}>
            <div className={styles.foodImage}>
               <img className={styles.image} alt="finished product" src={recipe.pictureUrl} />
            </div>
            <RecipeIngredients ingredients={recipe.ingredients} />
         </div>
      </div>
   </div>
);

export default RecipeWrapper;
