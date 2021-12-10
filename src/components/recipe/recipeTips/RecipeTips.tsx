import styles from '@/components/recipe/recipeTips/RecipeTips.module.scss';

interface RecipeTipsProps {
   tips: string;
}

const RecipeTips: React.FC<RecipeTipsProps> = ({ tips }) => (
   <div className={styles.tipsContainer}>
      <span className={styles.title}>Tips</span>
      <p className={styles.tips}>{tips}</p>
   </div>
);

export default RecipeTips;
