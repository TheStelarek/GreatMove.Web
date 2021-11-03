import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '@/pages/calculators/bmr-calculator/BMRCalculator.module.scss';
import Layout from '@/components/core/layout/Layout';
import Calculator from '@/components/calculator/Calculator';
import Input from '@/components/core/input/Input';
import Button from '@/components/core/button/Button';
import Radio from '@/components/core/radio/Radio';
import { bmrData } from '@/utils/data/calculators/bmrData';
import { calculateMifflinBMR } from '@/utils/functions/calculateMifflinBMR';
import { calculateHarrisBenedictBMR } from '@/utils/functions/calculateHarrisBenedictBMR';

interface BMRFormValue {
   gender: 1 | 2;
   height: number;
   weight: number;
   age: number;
}
const BMRCalculator = () => {
   const [mifflinBMR, setMifflinBMR] = useState<number>(0);
   const [harrisBenedictBMR, setHarrisBenedictBMR] = useState<number>(0);
   const { register, handleSubmit } = useForm<BMRFormValue>();

   const onSubmit = ({ gender, height, weight, age }: BMRFormValue) => {
      setMifflinBMR(calculateMifflinBMR(Number(gender), height, weight, age));
      setHarrisBenedictBMR(calculateHarrisBenedictBMR(Number(gender), height, weight, age));
   };

   return (
      <Calculator name={bmrData.name} description={bmrData.description}>
         <div className={styles.bmrContainer}>
            <div className={styles.bmrWrapper}>
               <form onSubmit={handleSubmit(onSubmit)} className={styles.bmrCalculator}>
                  <div className={styles.genderWrapper}>
                     <Radio fontVariant="p1" fontWeight="regular" value={1} label="Man" {...register(`gender`)} />
                     <Radio fontVariant="p1" fontWeight="regular" value={2} label="Female" {...register(`gender`)} />
                  </div>
                  <div className={styles.inputsWrapper}>
                     <div className={styles.group}>
                        <Input
                           size="large"
                           radius={5}
                           type="number"
                           min={1}
                           max={300}
                           label="Height"
                           placeholder="Enter your height"
                           {...register(`height`)}
                        />
                        <Input
                           size="large"
                           radius={5}
                           type="number"
                           min={1}
                           max={1000}
                           label="Weight"
                           placeholder="Enter your weight"
                           {...register(`weight`)}
                        />
                     </div>
                     <Input
                        size="large"
                        radius={5}
                        type="number"
                        min={1}
                        max={120}
                        label="Age"
                        placeholder="Enter your age"
                        {...register(`age`)}
                     />
                  </div>
                  <Button isFullWidth size="extra-large" type="submit" borderRadius={5}>
                     Calculate
                  </Button>
               </form>
            </div>
            <div className={styles.resultsContainer}>
               {!!mifflinBMR && !!harrisBenedictBMR && (
                  <div className={styles.resultsWrapper}>
                     <p className={styles.info}>
                        Your estimated <span className={styles.bmr}>BMR</span> is
                     </p>
                     <div className={styles.result}>
                        <span className={styles.dot} />
                        <p className={styles.kcal}>
                           {harrisBenedictBMR.toFixed(2)} kcal according to Harris Benedict formula
                        </p>
                     </div>
                     <div className={styles.result}>
                        <span className={styles.dot} />
                        <p className={styles.kcal}>{mifflinBMR.toFixed(2)} kcal according to Mifflin-St Jeor formula</p>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </Calculator>
   );
};

BMRCalculator.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};

export default BMRCalculator;
