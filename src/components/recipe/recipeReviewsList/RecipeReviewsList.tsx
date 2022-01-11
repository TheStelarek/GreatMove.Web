import styles from '@/components/recipe/recipeReviewsList/RecipeReviewsList.module.scss';
import { Review } from '@/utils/types/Review';
import { FC } from 'react';
import RecipeReviewsListItem from '../recipeReviewsListItem/RecipeReviewsListItem';

export const RecipeReviewsList: FC<{ reviews: Review[] }> = ({ reviews }) => (
   <ul className={styles.listContainer}>
      {reviews.map(({ id, username, created_at, rating, description }) => (
         <RecipeReviewsListItem
            key={id}
            id={id}
            username={username}
            created_at={created_at}
            rating={rating}
            description={description}
            upVotes={0}
            downVotes={0}
         />
      ))}
   </ul>
);
