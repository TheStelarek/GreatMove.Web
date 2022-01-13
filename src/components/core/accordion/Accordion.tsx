import { FC, useState } from 'react';
import cx from 'classnames';
import styles from '@/components/core/accordion/Accordion.module.scss';

interface AccordionProps {
   title: string;
   content: string;
}

const Accordion: FC<AccordionProps> = ({ title, content }) => {
   const [isActive, setIsActive] = useState(false);

   const toggle = () => setIsActive((prevState) => !prevState);

   return (
      <div className={styles.wrapper}>
         <button className={styles.header} onClick={toggle}>
            <div className={cx(styles.title, isActive && styles.titleActive)}>{title}</div>
            <span className={cx(styles.sign, isActive && styles.signActive)}>{isActive ? `-` : `+`}</span>
         </button>
         {isActive && <div className={styles.content}>{content}</div>}
      </div>
   );
};

export default Accordion;
