import { ReactNode } from 'react';
import cx from 'classnames';
import styles from '@/components/recipes/recipesFilterForm/RecipesFilterForm.module.scss';

const ListWrapper = ({
  title,
  titleBold,
  children,
}: {
  title: string;
  titleBold?: boolean;
  children: ReactNode;
}) => (
  <div className={styles.wrapper}>
    <p className={cx(styles.title, titleBold && styles.titleBold)}>
      <span>{title.split(` `)[0]}</span> {title.split(` `)[1]}
    </p>
    <ul className={styles.list}>{children}</ul>
  </div>
);

export default ListWrapper;
