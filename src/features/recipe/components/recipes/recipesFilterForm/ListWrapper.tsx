import { ReactNode } from 'react';
import styles from '@/features/recipe/components/recipes/recipesFilterForm/RecipesFilterForm.module.scss';

const ListWrapper = ({ title, children }: { title: string; children: ReactNode }) => (
   <div className={styles.wrapper}>
      <p className={styles.title}>
         <span>{title.split(` `)[0]}</span> {title.split(` `)[1]}
      </p>
      <ul className={styles.list}>{children}</ul>
   </div>
);

export default ListWrapper;
