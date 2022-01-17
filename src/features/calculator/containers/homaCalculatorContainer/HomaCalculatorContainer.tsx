import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/core/input/Input';
import Button from '@/components/core/button/Button';
import styles from '@/features/calculator/containers/homaCalculatorContainer/HomaCalculatorContainer.module.scss';
import { homaData } from '@/features/calculator/utils/data/homaData';
import Calculator from '@/features/calculator/components/calculatorWrapper/CalculatorWrapper';

interface HomaFormValue {
   insulin: number;
   glucose: number;
}

const HomaCalculatorContainer = () => {
   const [homa, setHoma] = useState(0);
   const { register, handleSubmit } = useForm<HomaFormValue>();

   const onSubmit = ({ insulin, glucose }: HomaFormValue) => {
      setHoma((insulin * glucose) / 22.5);
   };

   return (
      <Calculator name={homaData.name} description={homaData.description}>
         <div className={styles.homaContainer}>
            <div className={styles.homaWrapper}>
               <form onSubmit={handleSubmit(onSubmit)} className={styles.homaCalculator} noValidate>
                  <Input
                     size="large"
                     radius={5}
                     type="number"
                     min={0}
                     max={1000}
                     label="Insulin"
                     placeholder="mU/ml"
                     {...register(`insulin`)}
                  />
                  <Input
                     size="large"
                     radius={5}
                     type="number"
                     min={0}
                     max={1000}
                     label="Glucose"
                     placeholder="mg/dl"
                     {...register(`glucose`)}
                  />
                  <Button isFullWidth size="extra-large" type="submit" borderRadius={5}>
                     Calculate
                  </Button>
               </form>
               {!!homa && (
                  <div className={styles.result}>
                     Your <span className={styles.homa}>HOMA</span> is
                     <span className={styles.number}>{`   ${homa.toFixed(2)}`}</span>
                  </div>
               )}
            </div>
         </div>
      </Calculator>
   );
};

export default HomaCalculatorContainer;
