import Link from 'next/link';
import styles from '@/features/calculator/containers/calculatorsContainer/CalculatorsContainer.module.scss';
import { calculatorsData } from '@/features/calculator/utils/data/calculatorsData';

const CalculatorsContainer = () => (
   <div className={styles.container}>
      <div className={styles.calculators}>
         {calculatorsData.map(({ name, description, href }) => (
            <Link href={`calculators/${href}`} key={name}>
               <div className={styles.calculator}>
                  <p className={styles.name}>{name}</p>
                  <p className={styles.description}>{description}</p>
               </div>
            </Link>
         ))}
      </div>
   </div>
);

export default CalculatorsContainer;
