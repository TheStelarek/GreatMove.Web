import Rating from 'react-rating';
import styles from '@/components/recipe/recipeShare/RecipeShare.module.scss';
import Share from '@/public/recipe/share.svg';
import Print from '@/public/recipe/print.svg';

const RecipeShare = () => (
  <div className={styles.shareContainer}>
    <div className={styles.rating}>
      <div className={styles.categoryText}>5 reviews</div>
      <div className={styles.rate}>
        <Rating
          emptySymbol={
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1200px-Empty_Star.svg.png"
              className={styles.star}
            />
          }
          fullSymbol={
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Star_empty.svg/1200px-Star_empty.svg.png"
              className={styles.star}
            />
          }
        />
      </div>
    </div>
    <div className={styles.share}>
      <div className={styles.categoryText}>share</div>
      <button type="button" className={styles.button}>
        <Share className={styles.icon} />
      </button>
    </div>
    <div className={styles.print}>
      <div className={styles.categoryText}>print</div>
      <button type="button" className={styles.button}>
        <Print className={styles.icon} />
      </button>
    </div>
  </div>
);

export default RecipeShare;
