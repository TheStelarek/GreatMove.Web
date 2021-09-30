import styles from '@/components/recipe/recipeTips/RecipeTips.module.scss';

interface RecipeTipsProps {
  tips: string;
}

const RecipeTips: React.FC<RecipeTipsProps> = ({ tips }) => (
  <>
    <div className={styles.subTitle}>Tips</div>
    <div className={styles.tip}>
      <div className={styles.tips}>{tips}</div>
    </div>
  </>
);

export default RecipeTips;
