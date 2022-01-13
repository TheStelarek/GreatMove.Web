import React from 'react';
import styles from '@/features/recipe/components/recipe/recipeReviewsListItem/RecipeReviewsListItem.module.scss';

interface RecipeReviewListItemProps {
   id: string;
   rating: number;
   username: string;
   created_at: Date;
   description: string;
}

const RecipeReviewsListItem: React.FC<RecipeReviewListItemProps> = ({
   id,
   rating,
   username,
   created_at,
   description,
}) => (
   <li className={styles.listItemContainer}>
      <div className={styles.header}>
         <span className={styles.rate}>
            {[...Array(rating).keys()].map((r) => (
               <span key={r} className={styles.starIcon}>
                  ★
               </span>
            ))}
         </span>
         <p className={styles.author}>{`${username} - ${new Date(created_at).toLocaleDateString()}`}</p>
      </div>
      <p className={styles.comment}>{description}</p>
   </li>
);

export default RecipeReviewsListItem;
