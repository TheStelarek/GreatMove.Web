import { ReactElement } from 'react';
import Layout from '@/components/core/layout/Layout';
import RecipeIngredients from '@/components/recipe/recipeIngredients/RecipeIngredients';
import RecipeSteps from '@/components/recipe/recipeSteps/RecipeSteps';
import RecipeTips from '@/components/recipe/recipeTips/RecipeTips';
import RecipeNurtilions from '@/components/recipe/recipeNurtilions/RecipeNurtilions';
import RecipeShare from '@/components/recipe/recipeShare/RecipeShare';
import RecipeTime from '@/components/recipe/recipeTime/RecipeTime';
import { Ingredient } from '@/utils/types/Ingredient';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import RecipeReviews from '@/components/recipe/recipeReviews/RecipeReviews';
import styles from './Recipe.module.scss';

const steps = [`wloz jajko do garnka`, `wymieszaj`];
interface RecipeProps {
   ingredients: Ingredient[];
}

const Recipe: NextApplicationPage<RecipeProps> = ({ ingredients }) => (
   <div className={styles.recipeContainer}>
      <div className={styles.headerContainer}>
         <div className={styles.headerWrapper}>
            <div className={styles.headerContent}>
               <h1 className={styles.title}>Nocna owsianka z borowkami i bananem</h1>
               <div className={styles.timeWrapper}>
                  <RecipeTime totalTime={30} prepTime={50} cookTime={40} />
                  <RecipeShare />
               </div>
            </div>
         </div>
      </div>
      <div className={styles.recipeContent}>
         <div className={styles.leftContainer}>
            <p className={styles.recipeDescription}>
               Want a treat for breakfast? Give these overnights oast a try, it's like eating a dessert for brekkie. The
               combination of peanute butter and cocoa is amazing. just don't add to much cocoa as it's quite bitter.
            </p>
            <RecipeSteps steps={steps} />
            <RecipeNurtilions calories={40} protein={30} carbs={20} fats={14} fibre={36} />
            <RecipeTips tips="Want a treat for breakfast? Give these overnights oast a try, it's like eating a dessert for brekkie. The combination of peanute butter and cocoa is amazing. just don't add to much cocoa as it's quite bitter." />
            <RecipeReviews />
         </div>
         <div className={styles.rightContainer}>
            <div className={styles.foodImage}>
               <img
                  className={styles.image}
                  alt="finished product"
                  src="https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/5AEDC2E2-CFA3-4947-ADCE-725FDCB49ACA/Derivates/D1074D58-56AB-493C-8A33-A225B25DFA9C.jpg"
               />
            </div>
            <RecipeIngredients ingredients={ingredients} />
         </div>
      </div>
   </div>
);

export default Recipe;

Recipe.getLayout = function getLayout(page: ReactElement) {
   return (
      <Layout navbarVariant="purple" navbarBoxShadow={false} fullWidth>
         {page}
      </Layout>
   );
};

export async function getStaticProps() {
   const ingredients = [
      { id: `1`, name: `egg`, weight: 400 },
      { id: `2`, name: `milk`, weight: 300 },
      {
         id: `3`,
         name: `sugar`,
         weight: 300,
      },
   ];

   return {
      props: {
         ingredients,
      },
   };
}
