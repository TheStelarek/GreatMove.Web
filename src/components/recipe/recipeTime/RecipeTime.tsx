import styles from '@/components/recipe/recipeTime/RecipeTime.module.scss';
import React from 'react';
import Rating from 'react-rating';

interface RecipeTimeProps {
   totalTime: number;
   prepTime: number;
   cookTime: number;
}

const RecipeTime: React.FC<RecipeTimeProps> = ({ totalTime, prepTime, cookTime }) => (
   <div className={styles.timeContainer}>
      <div className={styles.timeInfo}>
         <div className={styles.textTime}> Total time </div>
         <div className={styles.textColor}> {totalTime}m </div>
      </div>
      <div className={styles.timeInfo}>
         <div className={styles.textTime}> Prep time </div>
         <div className={styles.textColor}> {prepTime}m </div>
      </div>
      <div className={styles.timeInfo}>
         <div className={styles.textTime}> Cook time</div>
         <div className={styles.textColor}> {cookTime}m </div>
      </div>
      <div className={styles.rating}>
         <p className={styles.textTime}>5 reviews</p>
         <div className={styles.rate}>
            <Rating
               emptySymbol={
                  <img
                     src="http://www.kukhula.co.za/wp-content/plugins/nd-learning/assets/img/icons/icon-star-empty-yellow.svg"
                     className={styles.star}
                  />
               }
               fullSymbol={
                  <img
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1024px-Gold_Star.svg.png"
                     className={styles.star}
                  />
               }
            />
         </div>
      </div>
   </div>
);

export default RecipeTime;
