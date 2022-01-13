import { FC } from 'react';
import styles from '@/features/recipe/components/recipe/recipeSteps/RecipeSteps.module.scss';

interface RecipeStepsProps {
   steps: { id: string; step: string }[];
}
const RecipeSteps: FC<RecipeStepsProps> = ({ steps }) => (
   <div className={styles.stepsContainer}>
      <h2 className={styles.title}>How to make it?</h2>
      <ul className={styles.steps}>
         {steps.map((s, index) => (
            <li key={s.id} className={styles.step}>
               {`${index + 1}. ${s.step[0].toUpperCase()}${s.step.slice(1).toLowerCase()}`}
            </li>
         ))}
      </ul>
   </div>
);

export default RecipeSteps;
