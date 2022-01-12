import { ReactNode } from 'react';
import styles from '@/features/recipe/components/recipes/recipesFilterForm/RecipesFilterForm.module.scss';

const RangeWrapper = ({ title, range, children }: { title: string; range: number[]; children: ReactNode }) => (
   <div className={styles.rangeWrapper}>
      <p className={styles.title}>
         <span>{title.split(` `)[0]}</span> {title.split(` `)[1]}
      </p>
      <p className={styles.range}>
         {range[0]} - {range[1]} g
      </p>
      <div className={styles.slider}>{children}</div>
   </div>
);

export default RangeWrapper;
