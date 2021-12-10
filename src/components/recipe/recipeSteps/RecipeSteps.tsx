import { FC } from 'react';
import styles from '@/components/recipe/recipeSteps/RecipeSteps.module.scss';

interface RecipeStepsProps {
   steps: Array<string>;
}
const RecipeSteps: FC<RecipeStepsProps> = ({ steps }) => (
   <div className={styles.stepsContainer}>
      <h2 className={styles.title}>How to make it?</h2>
      <ul className={styles.steps}>
         {steps.map((step, index) => (
            <li key={step} className={styles.step}>
               {`${index + 1}. ${step[0].toUpperCase()}${step.slice(1).toLowerCase()}`}
            </li>
         ))}
      </ul>
   </div>
);

export default RecipeSteps;
