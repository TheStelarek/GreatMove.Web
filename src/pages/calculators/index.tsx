import React, { ReactElement } from 'react';
import Layout from '@/components/core/layout/Layout';
import styles from '@/pages/calculators/Calculators.module.scss';
import { calculatorsData } from '@/utils/data/calculatorsData';

const Calculators = () => (
  <div className={styles.container}>
    <div className={styles.calculators}>
      {calculatorsData.map(({ name, description }) => (
        <div className={styles.calculator} key={name}>
          <p className={styles.name}>{name}</p>
          <p className={styles.description}>{description}</p>
        </div>
      ))}
    </div>
  </div>
);

Calculators.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Calculators;
