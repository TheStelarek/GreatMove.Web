import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '@/pages/calculators/one-rep-max-calculator/OneRepMaxCalculator.module.scss';
import Layout from '@/components/core/layout/Layout';
import Calculator from '@/components/calculator/Calculator';
import Input from '@/components/core/input/Input';
import { oneRepMaxData } from '@/utils/data/calculators/oneRepMaxData';
import { calculateOneRepMax } from '@/utils/functions/calculateRepMax';
import { fieldMax } from '@/utils/functions/fieldMax';

const OneRepMaxCalculator = () => {
   const [repMax, setRepMax] = useState<number>(0);
   const { register, watch } = useForm<{ weight: number; reps: number }>();

   const weightField = register(`weight`);
   const repsField = register(`reps`);

   const weight = watch(`weight`);
   const reps = watch(`reps`);

   useEffect(() => {
      if (weight && reps) setRepMax(calculateOneRepMax(weight, reps));
   }, [weight, reps]);

   return (
      <Calculator name={oneRepMaxData.name} description={oneRepMaxData.description}>
         <div className={styles.oneRepMax}>
            <div className={styles.form}>
               <div className={styles.inputWrapper}>
                  <Input
                     size="large"
                     radius={5}
                     type="number"
                     min={1}
                     max={1000}
                     label="Weight"
                     placeholder="Enter weight"
                     {...weightField}
                     onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                        e.target.value = fieldMax(+e.target.value, 1000) as string;
                        weightField.onChange(e);
                     }}
                  />
               </div>
               <div className={styles.inputWrapper}>
                  <Input
                     size="large"
                     radius={5}
                     type="number"
                     min={1}
                     max={20}
                     label="Reps"
                     placeholder="Enter number of reps"
                     {...repsField}
                     onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                        e.target.value = fieldMax(+e.target.value, 20) as string;
                        repsField.onChange(e);
                     }}
                  />
               </div>
            </div>
            {!!repMax && (
               <p className={styles.result}>
                  Your estimated <span className={styles.max}>MAX</span> is
                  <span className={styles.weight}>{`   ${repMax}`}</span>
               </p>
            )}
         </div>
      </Calculator>
   );
};

OneRepMaxCalculator.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};

export default OneRepMaxCalculator;
