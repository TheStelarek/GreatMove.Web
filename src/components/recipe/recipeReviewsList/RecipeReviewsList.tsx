import styles from '@/components/recipe/recipeReviewsList/RecipeReviewsList.module.scss';
import { useState } from 'react';
import RecipeReviewListItem from '../recipeReviewListItem/RecipeReviewListItem';

export const RecipeReviewsList = () => {
   const [reviews, setReviews] = useState([
      {
         id: `1`,
         username: `dennisbuk123`,
         createdAt: `Paź 11, 2021`,
         rate: 4,
         comment: `Bardzo dobre danie, polecam goraco 123`,
         upVotes: 10,
         downVotes: 0,
      },
      {
         id: `2`,
         username: `dennisbuk123`,
         createdAt: `Paź 11, 2021`,
         rate: 1,
         comment: `Bardzo dobre danie, polecam goraco 123`,
         upVotes: 1,
         downVotes: 10,
      },
      {
         id: `3`,
         username: `dennisbuk123`,
         createdAt: `Paź 11, 2021`,
         rate: 5,
         comment: `Bardzo dobre danie, polecam goraco 123`,
         upVotes: 10,
         downVotes: 0,
      },
   ]);

   return (
      <ul className={styles.listContainer}>
         {reviews.map(({ id, username, createdAt, rate, comment, upVotes, downVotes }) => (
            <RecipeReviewListItem
               key={id}
               id={id}
               username={username}
               createdAt={createdAt}
               rate={rate}
               comment={comment}
               upVotes={upVotes}
               downVotes={downVotes}
            />
         ))}
      </ul>
   );
};
