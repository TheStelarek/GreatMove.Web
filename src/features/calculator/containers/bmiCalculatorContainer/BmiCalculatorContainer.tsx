import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '@/features/calculator/containers/bmiCalculatorContainer/BmiCalculatorContainer.module.scss';
import Calculator from '@/features/calculator/components/calculatorWrapper/CalculatorWrapper';
import Input from '@/components/core/input/Input';
import { bmiData, bmiRanges } from '@/features/calculator/utils/data/bmiData';
import { calculateBMI } from '@/utils/functions/calculateBMI';
import { fieldMax } from '@/utils/functions/fieldMax';

const BmiCalculatorContainer = () => {
   const [bmi, setBmi] = useState<number>(0);
   const { register, watch } = useForm<{ height: number; weight: number }>();

   const heightField = register(`height`);
   const weightField = register(`weight`);

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
                        min={1}
                        max={300}
                        label="Height"
                        placeholder="Enter your height"
                        {...heightField}
                        onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                           e.target.value = fieldMax(+e.target.value, 300) as string;
                           heightField.onChange(e);
                        }}
                     />
                  </div>
                  <div className={styles.inputWrapper}>
                     <Input
                        size="large"
                        radius={5}
                        type="number"
                        min={1}
                        max={1000}
                        label="Weight"
                        placeholder="Enter your weight"
                        {...weightField}
                        onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                           e.target.value = fieldMax(+e.target.value, 1000) as string;
                           weightField.onChange(e);
                        }}
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

export default BmiCalculatorContainer;
