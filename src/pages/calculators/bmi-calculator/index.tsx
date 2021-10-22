import { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '@/pages/calculators/bmi-calculator/BMICalculator.module.scss';
import Layout from '@/components/core/layout/Layout';
import Calculator from '@/components/calculator/Calculator';
import Input from '@/components/core/input/Input';
import { bmiData, bmiRanges } from '@/utils/data/calculators/bmiData';
import { calculateBMI } from '@/utils/functions/calculateBMI';

const BMICalculator = () => {
  const [bmi, setBmi] = useState<number>(0);
  const { register, watch } = useForm<{ height: number; weight: number }>();

  const height = watch(`height`);
  const weight = watch(`weight`);

  useEffect(() => {
    if (height && weight) setBmi(calculateBMI(height, weight));
  }, [height, weight]);

  return (
    <Calculator name={bmiData.name} description={bmiData.description}>
      <div className={styles.bmiWrapper}>
        <div className={styles.bmiCalculator}>
          <div className={styles.form}>
            <div className={styles.inputWrapper}>
              <Input
                size="large"
                radius={5}
                type="number"
                min={60}
                max={250}
                label="Height"
                placeholder="Enter your height"
                {...register(`height`)}
              />
            </div>
            <div className={styles.inputWrapper}>
              <Input
                size="large"
                radius={5}
                type="number"
                min={15}
                max={400}
                label="Weight"
                placeholder="Enter your weight"
                {...register(`weight`)}
              />
            </div>
          </div>
          {!!bmi && (
            <p className={styles.info}>
              Your <span className={styles.name}>BMI</span> is
              <span className={styles.result}>{`   ${bmi}`}</span>
            </p>
          )}
        </div>
        <ul className={styles.ranges}>
          {bmiRanges.map(({ range, category }) => (
            <li className={styles.range} key={category}>
              <span className={styles.dot} />
              <p className={styles.values}>{range}</p>
              <p className={styles.category}>{category}</p>
            </li>
          ))}
        </ul>
      </div>
    </Calculator>
  );
};

BMICalculator.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default BMICalculator;
