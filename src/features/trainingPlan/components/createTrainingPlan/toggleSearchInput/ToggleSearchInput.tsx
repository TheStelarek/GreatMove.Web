import { useState, FC } from 'react';
import styles from '@/features/trainingPlan/components/createTrainingPlan/toggleSearchInput/ToggleSearchInput.module.scss';
import SearchExerciseInput from '@/features/trainingPlan/components/createTrainingPlan/searchExerciseInput/SearchExerciseInput';
import Plus from '@/public/icons/plus.svg';

interface AddExerciseProps {
   trainingDayId: string;
}

const ToggleSearchInput: FC<AddExerciseProps> = ({ trainingDayId }) => {
   const [showInput, setShowInput] = useState<boolean>(false);

   const toggleShowInput = () => setShowInput((prevState) => !prevState);

   return (
      <div className={styles.addExerciseWrapper}>
         <button className={styles.addBtn} onClick={toggleShowInput}>
            <Plus className={styles.addIcon} />
         </button>
         {showInput && <SearchExerciseInput trainingDayId={trainingDayId} setShowInput={setShowInput} />}
      </div>
   );
};

export default ToggleSearchInput;
