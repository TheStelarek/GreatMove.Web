import { FC } from 'react';
import styles from '@/features/recipe/components/recipe/recipeReviewsList/RecipeReviewsList.module.scss';
import { Review } from '@/features/recipe/utils/types/Review';
import RecipeReviewsListItem from '@/features/recipe/components/recipe/recipeReviewsListItem/RecipeReviewsListItem';

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
