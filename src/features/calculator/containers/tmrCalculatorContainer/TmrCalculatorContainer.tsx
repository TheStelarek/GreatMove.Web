import { useState } from 'react';
import Select from 'react-select';
import { useForm, Controller, NestedValue } from 'react-hook-form';
import styles from '@/features/calculator/containers/tmrCalculatorContainer/TmrCalculatorContainer.module.scss';
import Calculator from '@/features/calculator/components/calculatorWrapper/CalculatorWrapper';
import { physicalActivities, tmrData } from '@/features/calculator/utils/data/tmrData';
import Input from '@/components/core/input/Input';
import Button from '@/components/core/button/Button';
import Radio from '@/components/core/radio/Radio';
import { calculateHarrisBenedictBMR } from '@/utils/functions/calculateHarrisBenedictBMR';
import { OptionType } from '@/utils/types/OptionType';

interface TMRFormValue {
   gender: 1 | 2;
   height: number;
   weight: number;
   age: number;
   activity: NestedValue<OptionType>;
}

const options: OptionType[] = [
   { value: `1.2`, label: `Lying lifestyle` },
   { value: `1.4`, label: `Sedentary lifestyle` },
   { value: `1.52`, label: `Moderate physical activity` },
   { value: `1.62`, label: `Above average physical activity` },
   { value: `1.8`, label: `High physical activity` },
   { value: `2.0`, label: `Very high physical activity` },
];

const TmrCalculatorContainer = () => {
   const [bmr, setBmr] = useState<number>(0);
   const { register, handleSubmit, control } = useForm<TMRFormValue>();

   const onSubmit = ({ gender, height, weight, age, activity }: TMRFormValue) => {
      const result = calculateHarrisBenedictBMR(Number(gender), height, weight, age);
      setBmr(result * Number(activity.value));
   };

   return (
      <Calculator name={tmrData.name} description={tmrData.description}>
         <div className={styles.tmrContainer}>
            <div className={styles.tmrWrapper}>
               <form onSubmit={handleSubmit(onSubmit)} className={styles.tmrCalculator}>
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
                     <div className={styles.group}>
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

                        <Controller
                           name="activity"
                           control={control}
                           rules={{ required: true }}
                           render={({ field }) => (
                              <Select
                                 isSearchable={false}
                                 classNamePrefix="react-select"
                                 className="rs rs-large"
                                 options={options}
                                 {...field}
                                 placeholder="Select your activity"
                              />
                           )}
                        />
                     </div>
                  </div>
                  <Button isFullWidth size="extra-large" type="submit" borderRadius={5}>
                     Calculate
                  </Button>
               </form>
               {!!bmr && (
                  <div className={styles.result}>
                     Your estimated <span className={styles.tmr}>TMR</span> is
                     <span className={styles.kcal}>{`   ${bmr.toFixed(2)} kcal`}</span>
                     <p className={styles.info}>
                        If you want to lose weight, eat about
                        {` ${(bmr - 498).toFixed(2)} - ${(bmr - 210).toFixed(2)} `}
                        kcal . If you want to gain weight eat about
                        {` ${(bmr + 205).toFixed(2)} - ${(bmr + 505).toFixed(2)} `}
                     </p>
                  </div>
               )}
            </div>
            <div className={styles.activityInfo}>
               <span className={styles.title}>PHYSICAL ACTIVITY:</span>
               <ul className={styles.activites}>
                  {physicalActivities.map(({ description, category }) => (
                     <li className={styles.physicalActivity} key={category}>
                        <span className={styles.dot} />
                        <p className={styles.description}>{description} </p>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </Calculator>
   );
};

export default TmrCalculatorContainer;
