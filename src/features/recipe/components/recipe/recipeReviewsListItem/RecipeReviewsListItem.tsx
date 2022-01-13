import React from 'react';
import styles from '@/features/recipe/components/recipe/recipeReviewsListItem/RecipeReviewsListItem.module.scss';
import Up from '@/public/recipe/up.svg';
import Down from '@/public/recipe/down.svg';

interface RecipeReviewListItemProps {
   id: string;
   rating: number;
   username: string;
   created_at: Date;
   description: string;
   upVotes: number;
   downVotes: number;
}

const RecipeReviewsListItem: React.FC<RecipeReviewListItemProps> = ({
   id,
   rating,
   username,
   created_at,
   description,
   upVotes,
   downVotes,
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
      <div className={styles.votes}>
         <button className={styles.voteBtn}>
            3 <Up className={styles.voteIcon} />
         </button>
         <button className={styles.voteBtn}>
            1 <Down className={styles.voteIcon} />
         </button>
      </div>
   </li>
);

export default RecipeReviewsListItem;
