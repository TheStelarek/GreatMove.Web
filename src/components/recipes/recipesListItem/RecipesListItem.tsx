import styles from '@/components/recipes/recipesListItem/RecipesListItem.module.scss';
import { Recipe } from '@/utils/types/Recipe';
import Image from 'next/image';

const RecipesListItem: React.FC<Recipe> = ({
  name,
  meal,
  calories,
  difficulty,
  estimatedTime,
}) => (
  <div className={styles.recipe}>
    <div className={styles.image}>
      <Image
        src="/recipes/placki.jpg"
        alt="Picture of the author"
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className={styles.content}>
      <div className={styles.meal}>
        <p>{meal}</p>
        <p>Calories: {calories}</p>
      </div>
      <p className={styles.name}>{name}</p>
      <div className={styles.difficulty}>
        <p>{difficulty}</p>
        <p>{estimatedTime} MINS</p>
      </div>
    </div>
  </div>
);

export default RecipesListItem;
