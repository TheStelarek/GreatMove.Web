import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { addColumn } from '@/store/trainingPlan/TrainingPlanSlice';
import Input from '@/components/core/input/Input';
import styles from '@/components/trainingPlan/newTraining/NewTraining.module.scss';

const NewTraining = () => {
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
         dispatch(addColumn(trainingName));
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
            <Input
               autoFocus
               size="small"
               placeholder="Enter a training name"
               onChange={onChangeHandler}
               onBlur={onBlurHandler}
               onKeyPress={onEnterPressHandler}
            />
         )}
      </div>
   );
};

export default NewTraining;
