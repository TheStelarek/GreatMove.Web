import { FC } from 'react';
import Cooking from '@/public/create-recipe/cooking.svg';
import Button from '@/components/core/button/Button';
import styles from '@/components/create-recipe/createRecipeBox/CreateRecipeBox.module.scss';

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
