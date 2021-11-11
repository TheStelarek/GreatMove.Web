import { useState, FC } from 'react';
import Plus from '@/public/create-training-plan/plus.svg';
import styles from '@/components/trainingPlan/addExercise/AddExercise.module.scss';
import SearchExercise from '@/components/trainingPlan/searchExercise/SearchExercise';

interface AddExerciseProps {
   trainingDayId: string;
}

const AddExercise: FC<AddExerciseProps> = ({ trainingDayId }) => {
   const [showInput, setShowInput] = useState<boolean>(false);

   const toggleShowInput = () => setShowInput((prevState) => !prevState);

   return (
      <div className={styles.addExerciseWrapper}>
         <button className={styles.addBtn} onClick={toggleShowInput}>
            <Plus className={styles.addIcon} />
         </button>
         {showInput && <SearchExercise trainingDayId={trainingDayId} setShowInput={setShowInput} />}
      </div>
   );
};

export default AddExercise;
