import styles from '@/components/recipe/recipeSteps/RecipeSteps.module.scss';

interface RecipeStepsProps {
   steps: Array<string>;
}
const RecipeSteps: React.FC<RecipeStepsProps> = ({ steps }) => (
   <div className={styles.stepsContainer}>
      <p className={styles.subTitle}>How to make it?</p>
      <div className={styles.steps}>{!!steps?.length && steps.map((step) => <p key={step}> {step} </p>)}</div>
   </div>
);

export default RecipeSteps;
