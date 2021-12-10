import React from 'react';
import styles from '@/components/recipe/recipeReviewListItem/RecipeReviewListItem.module.scss';
import Star from '@/public/recipe/star.svg';
import Up from '@/public/recipe/up.svg';
import Down from '@/public/recipe/down.svg';

interface RecipeReviewListItemProps {
   id: string;
   rate: number;
   username: string;
   createdAt: string;
   comment: string;
   upVotes: number;
   downVotes: number;
}

const RecipeReviewListItem: React.FC<RecipeReviewListItemProps> = ({
   id,
   rate,
   username,
   createdAt,
   comment,
   upVotes,
   downVotes,
}) => (
   <li className={styles.listItemContainer}>
      <div className={styles.header}>
         <span className={styles.rate}>
            {[...Array(rate).keys()].map((r) => (
               <Star key={r} className={styles.starIcon} />
            ))}
         </span>
         <p className={styles.author}>{`${username} - ${createdAt}`}</p>
      </div>
      <p className={styles.comment}>{comment}</p>
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

export default RecipeReviewListItem;
