import { ReactElement } from 'react';
import styles from '@/styles/Recipe.module.scss';
import Layout from '@/components/core/layout/Layout';
import RecipeIngredients from '@/components/recipe/recipeIngredients/RecipeIngredients';
import RecipeSteps from '@/components/recipe/recipeSteps/RecipeSteps';
import RecipeTips from '@/components/recipe/recipeTips/RecipeTips';
import RecipeNurtilion from '@/components/recipe/recipeNurtilion/RecipeNurtilion';
import RecipeShare from '@/components/recipe/recipeShare/RecipeShare';
import RecipeTime from '@/components/recipe/recipeTime/RecipeTime';
import { Ingredient } from '@/utils/types/Ingredient';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';

const steps = [`wloz jajko dogarnka`, `wymieszaj`];
interface RecipeProps {
  ingredients: Ingredient[];
}
const Recipe: NextApplicationPage<RecipeProps> = ({ ingredients }) => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.background}>
        <div className={styles.title}>
          Chocolate and peanut butter overnight oats
        </div>
        <div className={styles.timeAndRating}>
          <RecipeTime totalTime={30} prepTime={50} cookTime={40} />
          <RecipeShare />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.leftBox}>
          <p className={styles.desc}>
            Want a treat for breakfast? Give these overnights oast a try, it's
            like eating a dessert for brekkie. The combination of peanute butter
            and cocoa is amazing. just don't add to much cocoa as it's quite
            bitter.
          </p>
          <RecipeNurtilion
            calories={40}
            protein={30}
            carbs={20}
            fats={14}
            fibre={36}
          />
          <RecipeTips tips="nie przypal :)" />
          <RecipeSteps steps={steps} />
        </div>
        <div className={styles.foods}>
          <img
            className={styles.foodIMG}
            alt="finished product"
            src="https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/5AEDC2E2-CFA3-4947-ADCE-725FDCB49ACA/Derivates/D1074D58-56AB-493C-8A33-A225B25DFA9C.jpg"
          />
          <RecipeIngredients ingredients={ingredients} />
        </div>
      </div>
    </div>
  </div>
);

export default Recipe;

Recipe.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const ingredients = [{ id: `1`, name: `egg`, weight: 400 }];

  return {
    props: {
      ingredients,
    },
  };
}
