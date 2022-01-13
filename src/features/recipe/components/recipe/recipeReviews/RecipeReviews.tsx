import { FC } from 'react';
import Button from '@/components/core/button/Button';
import useModal from '@/components/core/modal/useModal';
import styles from '@/features/recipe/components/recipe/recipeReviews/RecipeReviews.module.scss';
import { Line } from 'rc-progress';
import { Review } from '@/features/recipe/utils/types/Review';
import { Rating } from '@/utils/types/Rating';
import { calculateAvgRating } from '@/utils/functions/calculateAvgRating';
import RecipeReviewsAddModal from '@/features/recipe/components/recipe/recipeReviewsAddModal/RecipeReviewsAddModal';
import { RecipeReviewsList } from '@/features/recipe/components/recipe/recipeReviewsList/RecipeReviewsList';

const RecipeReviews: FC<{ recipeId: string; reviews: Review[]; groupedRating: Rating }> = ({
   recipeId,
   reviews,
   groupedRating,
}) => {
   const { isOpen, handleOpenModal, handleCloseModal } = useModal();

   const totalRatings = Object.values(groupedRating).reduce((a, b) => a + b);
   const calculatePercentage = (count: number) => {
      const perc = (count / totalRatings) * 100;

      return Number.isNaN(perc) ? 0 : perc;
   };

   return (
      <div className={styles.reviewsContainer}>
         <div className={styles.reviewsWrapper}>
            <div className={styles.info}>
               <span className={styles.title}>Reviews</span>
               <p className={styles.description}>Explore other opinions or leave your own!</p>
               <RecipeReviewsAddModal recipeId={recipeId} isOpen={isOpen} closeModal={handleCloseModal} />
               <div className={styles.addBtnWrapper}>
                  <Button size="small" variant="secondary" borderRadius={5} onClick={() => handleOpenModal()}>
                     Add review
                  </Button>
               </div>
            </div>
            <div className={styles.ratingContainer}>
               <div className={styles.info}>
                  <p className={styles.rating}>
                     <span>{calculateAvgRating(groupedRating, reviews.length)}</span>/ 5.0
                  </p>
                  <span className={styles.reviewsNumber}>{reviews.length} reviews</span>
               </div>
               <div className={styles.ratingStars}>
                  <div className={styles.progress}>
                     <div className={styles.rating}>
                        <p className={styles.ratingNumber}>5</p>
                        <span className={styles.starIcon}>★</span>
                     </div>
                     <Line
                        className={styles.progress}
                        percent={calculatePercentage(groupedRating[`5`])}
                        strokeColor="#FBBF24"
                        trailColor="#CAD5DE"
                     />
                     <p className={styles.ratingCount}>{groupedRating[`5`]}</p>
                  </div>
                  <div className={styles.progress}>
                     <div className={styles.rating}>
                        <p className={styles.ratingNumber}>4</p>
                        <span className={styles.starIcon}>★</span>
                     </div>

                     <Line
                        className={styles.progress}
                        percent={calculatePercentage(groupedRating[`4`])}
                        strokeColor="#FBBF24"
                        trailColor="#CAD5DE"
                     />
                     <p className={styles.ratingCount}>{groupedRating[`4`]}</p>
                  </div>
                  <div className={styles.progress}>
                     <div className={styles.rating}>
                        <p className={styles.ratingNumber}>3</p>
                        <span className={styles.starIcon}>★</span>
                     </div>

                     <Line
                        className={styles.progress}
                        percent={calculatePercentage(groupedRating[`3`])}
                        strokeColor="#FBBF24"
                        trailColor="#CAD5DE"
                     />
                     <p className={styles.ratingCount}>{groupedRating[`3`]}</p>
                  </div>
                  <div className={styles.progress}>
                     <div className={styles.rating}>
                        <p className={styles.ratingNumber}>2</p>
                        <span className={styles.starIcon}>★</span>
                     </div>

                     <Line
                        className={styles.progress}
                        percent={calculatePercentage(groupedRating[`2`])}
                        strokeColor="#FBBF24"
                        trailColor="#CAD5DE"
                     />
                     <p className={styles.ratingCount}>{groupedRating[`2`]}</p>
                  </div>
                  <div className={styles.progress}>
                     <div className={styles.rating}>
                        <p className={styles.ratingNumber}>1</p>
                        <span className={styles.starIcon}>★</span>
                     </div>
                     <Line
                        className={styles.progress}
                        percent={calculatePercentage(groupedRating[`1`])}
                        strokeColor="#FBBF24"
                        trailColor="#CAD5DE"
                     />
                     <p className={styles.ratingCount}>{groupedRating[`1`]}</p>
                  </div>
               </div>
            </div>
         </div>
         <RecipeReviewsList reviews={reviews} />
      </div>
   );
};

export default RecipeReviews;
