import { FC } from 'react';
import Button from '@/components/core/button/Button';
import styles from '@/features/recipe/components/create-recipe/createRecipeBox/CreateRecipeBox.module.scss';
import Cooking from '@/public/illustrations/cooking.svg';

const CreateRecipeBox: FC<{ create: () => void }> = ({ create }) => (
   <div className={styles.createRecipeBox}>
      <Cooking className={styles.illustration} />
      <p className={styles.shortInfo}>Create your custom recipe!</p>
      <Button size="large" isFullWidth onClick={() => create()}>
         Create new recipe
      </Button>
   </div>
);

export default CreateRecipeBox;
