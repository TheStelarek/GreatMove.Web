import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Calculator from '@/features/calculator/components/calculatorWrapper/CalculatorWrapper';
import Table from '@/components/core/table/Table';
import Input from '@/components/core/input/Input';
import Button from '@/components/core/button/Button';
import { calculateSmolovJrWeek } from '@/utils/functions/calculateSmolovJrWeek';
import { smolovJrData } from '@/features/calculator/utils/data/smolovJrData';
import styles from '@/features/calculator/containers/smolovJrCalculatorContainer/SmolovJrCalculatorContainer.module.scss';

interface SmolovJrDay {
   day: string;
   sets: number;
   reps: number;
   weight: number;
}
interface SmolovJrFormValue {
   max: number;
   increment: number;
}
const SmolovJrCalculatorContainer = () => {
   const [weekOne, setWeekOne] = useState<SmolovJrDay[]>([]);
   const [weekTwo, setWeekTwo] = useState<SmolovJrDay[]>([]);
   const [weekThree, setWeekThree] = useState<SmolovJrDay[]>([]);

   const { register, handleSubmit } = useForm<SmolovJrFormValue>();

   const onSubmit = ({ max, increment }: SmolovJrFormValue) => {
      setWeekOne(calculateSmolovJrWeek(max, 0));
      setWeekTwo(calculateSmolovJrWeek(max, +increment));
      setWeekThree(calculateSmolovJrWeek(max, increment * 2));
   };

   const columns = useMemo(
      () => [
         {
            Header: `DAY`,
            accessor: `day` as const,
         },
         {
            Header: `SETS`,
            accessor: `sets` as const,
         },
         {
            Header: `REPS`,
            accessor: `reps` as const,
         },
         {
            Header: `WEIGHT`,
            accessor: `weight` as const,
         },
      ],
      [],
   );

   const weekOneData = useMemo(() => [...weekOne], [weekOne]);
   const weekTwoData = useMemo(() => [...weekTwo], [weekTwo]);
   const weekThreeData = useMemo(() => [...weekThree], [weekThree]);

   return (
      <Calculator name={smolovJrData.name} description={smolovJrData.description}>
         <div className={styles.smolovWrapper}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.smolovForm}>
               <Input
                  size="large"
                  radius={5}
                  type="number"
                  min={10}
                  max={1000}
                  label="1 Rep Max"
                  placeholder="Enter your max rep"
                  {...register(`max`)}
               />
               <Input
                  size="large"
                  radius={5}
                  type="number"
                  min={1}
                  max={20}
                  label="Increment"
                  placeholder="Enter weight increment"
                  {...register(`increment`)}
               />
               <Button isFullWidth size="large" type="submit">
                  Calculate
               </Button>
            </form>
            <div className={styles.smolovResults}>
               {!!weekOneData.length && !!weekTwoData.length && !!weekThreeData.length && (
                  <>
                     <div className={styles.result}>
                        <span className={styles.week}>Week 1</span>
                        <Table columns={columns} data={weekOneData} />
                     </div>
                     <div className={styles.result}>
                        <span className={styles.week}>Week 2</span>
                        <Table columns={columns} data={weekTwoData} />
                     </div>
                     <div className={styles.result}>
                        <span className={styles.week}>Week 3</span>
                        <Table columns={columns} data={weekThreeData} />
                     </div>
                  </>
               )}
            </div>
         </div>
      </Calculator>
   );
};

export default SmolovJrCalculatorContainer;
