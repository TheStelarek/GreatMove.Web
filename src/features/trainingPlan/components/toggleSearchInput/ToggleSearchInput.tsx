import { useState, FC } from 'react';
import Plus from '@/public/create-training-plan/plus.svg';
import styles from '@/features/trainingPlan/components/toggleSearchInput/ToggleSearchInput.module.scss';
import SearchExerciseInput from '@/features/trainingPlan/components/searchExerciseInput/SearchExerciseInput';

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
