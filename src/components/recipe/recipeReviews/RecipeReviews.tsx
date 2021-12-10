import styles from '@/components/recipe/recipeReviews/RecipeReviews.module.scss';
import Star from '@/public/recipe/star.svg';
import { Line } from 'rc-progress';
import { RecipeReviewsList } from '../recipeReviewsList/RecipeReviewsList';

const RecipeReviews = () => (
   <div className={styles.reviewsContainer}>
      <div className={styles.reviewsWrapper}>
         <div className={styles.info}>
            <span className={styles.title}>Reviews</span>
            <p className={styles.description}>Explore other opinions or leave your own!</p>
         </div>
         <div className={styles.ratingContainer}>
            <div className={styles.info}>
               <p className={styles.rating}>
                  <span>4.9</span>/ 5.0
               </p>
               <span className={styles.reviewsNumber}>9 reviews</span>
            </div>
            <div className={styles.ratingStars}>
               <div className={styles.progress}>
                  <div className={styles.rating}>
                     <p className={styles.ratingNumber}>5</p>
                     <Star className={styles.starIcon} />
                  </div>

                  <Line className={styles.progress} percent={40} strokeColor="#FBBF24" trailColor="#CAD5DE" />
                  <p className={styles.ratingCount}>4</p>
               </div>
               <div className={styles.progress}>
                  <div className={styles.rating}>
                     <p className={styles.ratingNumber}>4</p>
                     <Star className={styles.starIcon} />
                  </div>

                  <Line className={styles.progress} percent={60} strokeColor="#FBBF24" trailColor="#CAD5DE" />
                  <p className={styles.ratingCount}>14</p>
               </div>
               <div className={styles.progress}>
                  <div className={styles.rating}>
                     <p className={styles.ratingNumber}>3</p>
                     <Star className={styles.starIcon} />
                  </div>

                  <Line className={styles.progress} percent={40} strokeColor="#FBBF24" trailColor="#CAD5DE" />
                  <p className={styles.ratingCount}>4</p>
               </div>
               <div className={styles.progress}>
                  <div className={styles.rating}>
                     <p className={styles.ratingNumber}>2</p>
                     <Star className={styles.starIcon} />
                  </div>

                  <Line className={styles.progress} percent={40} strokeColor="#FBBF24" trailColor="#CAD5DE" />
                  <p className={styles.ratingCount}>4</p>
               </div>
               <div className={styles.progress}>
                  <div className={styles.rating}>
                     <p className={styles.ratingNumber}>1</p>
                     <Star className={styles.starIcon} />
                  </div>
                  <Line className={styles.progress} percent={40} strokeColor="#FBBF24" trailColor="#CAD5DE" />
                  <p className={styles.ratingCount}>4</p>
               </div>
            </div>
         </div>
      </div>
      <RecipeReviewsList />
   </div>
);

export default RecipeReviews;
