import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { addTrainingDay } from '@/features/trainingPlan/store/TrainingPlanSlice';
import Input from '@/components/core/input/Input';
import styles from '@/features/trainingPlan/components/createTrainingPlan/newTrainingDay/NewTrainingDay.module.scss';

const NewTrainingDay = () => {
   const dispatch = useAppDispatch();

   const [showTrainingNameInput, setShowTrainingNameInput] = useState<boolean>(false);
   const [trainingName, setTrainingName] = useState<string>(``);

   const showInput = () => setShowTrainingNameInput(true);

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTrainingName(e.target.value);

   const onBlurHandler = () => {
      setShowTrainingNameInput(false);
   };

   const onEnterPressHandler = (e: KeyboardEvent) => {
      if (e.key === `Enter`) {
         dispatch(addTrainingDay(trainingName));
         setShowTrainingNameInput(false);
      }
   };

   return (
      <div className={styles.newTrainingWrapper}>
         {!showTrainingNameInput ? (
            <button onClick={showInput} className={styles.addTrainingBtn}>
               Add training day
            </button>
         ) : (
            <div className={styles.inputWrapper}>
               <Input
                  autoFocus
                  size="small"
                  placeholder="Enter a training name"
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                  onKeyPress={onEnterPressHandler}
               />
            </div>
         )}
      </div>
   );
};

export default NewTrainingDay;
