import { ReactElement } from 'react';
import Link from 'next/link';
import Layout from '@/components/core/layout/Layout';
import styles from '@/pages/calculators/Calculators.module.scss';
import { calculatorsData } from '@/utils/data/calculators/calculatorsData';

const Calculators = () => (
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

Calculators.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Calculators;
