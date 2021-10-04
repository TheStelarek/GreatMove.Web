import { ReactNode } from 'react';
import styles from '@/components/recipes/recipesFilterForm/RecipesFilterForm.module.scss';

const RangeWrapper = ({
  title,
  range,
  children,
}: {
  title: string;
  range: number[];
  children: ReactNode;
}) => (
  <div className={styles.rangeWrapper}>
    <p className={styles.title}>
      <span>{title.split(` `)[0]}</span> {title.split(` `)[1]}
    </p>
    <p className={styles.range}>
      {range[0]} - {range[1]} g
    </p>
    {children}
  </div>
);

export default RangeWrapper;
