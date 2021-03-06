import { FC, useState, KeyboardEvent, ChangeEvent } from 'react';
import Input from '@/components/core/input/Input';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { updateTrainingDayName } from '@/features/trainingPlan/store/TrainingPlanSlice';
import styles from '@/features/trainingPlan/components/createTrainingPlan/trainingDayName/TrainingDayName.module.scss';

interface TrainingDayNameProps {
   trainingDayId: string;
   trainingName: string;
}

const TrainingDayName: FC<TrainingDayNameProps> = ({ trainingDayId, trainingName }) => {
   const [showNameInput, setShowNameInput] = useState<boolean>(false);
   const [name, setName] = useState<string>(trainingName);

   const dispatch = useAppDispatch();

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

   const onBlurHandler = () => {
      if (name) dispatch(updateTrainingDayName({ trainingDayId, name }));
      setShowNameInput(false);
   };

   const onEnterPressHandler = (e: KeyboardEvent) => {
      if (e.key === `Enter` && name) {
         setShowNameInput(false);
         dispatch(updateTrainingDayName({ trainingDayId, name }));
      }
   };

   return (
      <div className={styles.nameWrapper}>
         {!showNameInput ? (
            <button onClick={() => setShowNameInput(true)}>
               <span className={styles.trainingName}>{trainingName}</span>
            </button>
         ) : (
            <Input
               autoFocus
               value={name}
               size="small"
               onChange={onChangeHandler}
               onBlur={onBlurHandler}
               onKeyPress={onEnterPressHandler}
            />
         )}
      </div>
   );
};

export default TrainingDayName;
