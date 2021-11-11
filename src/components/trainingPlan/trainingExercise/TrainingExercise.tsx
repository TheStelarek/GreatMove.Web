import { FC, useState } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import Drag from '@/public/create-training-plan/drag.svg';
import ExerciseDetails from '@/components/trainingPlan/exerciseDetails/ExerciseDetails';
import styles from '@/components/trainingPlan/trainingExercise/TrainingExercise.module.scss';
import { ExerciseType } from '@/utils/types/ExerciseType';
import ExerciseDetailsForm from '@/components/trainingPlan/exerciseDetailsForm/ExerciseDetailsForm';
import Remove from '@/public/my-shopping-list/remove.svg';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { removeExercise } from '@/store/trainingPlan/TrainingPlanSlice';

interface TrainingExerciseProps {
   trainingDayId: string;
   exercise: ExerciseType;
   index: number;
   provided: DraggableProvided;
}

const TrainingExercise: FC<TrainingExerciseProps> = ({ trainingDayId, exercise, index, provided }) => {
   const [isExpanded, setIsExpanded] = useState<boolean>(false);
   const dispatch = useAppDispatch();

   const toggleExpand = () => {
      setIsExpanded((prevState) => !prevState);
   };

   const removeExerciseFromTraining = () =>
      dispatch(
         removeExercise({
            trainingDayId,
            exerciseId: exercise.id,
         }),
      );

   return (
      <div className={styles.trainingExerciseContainer} ref={provided.innerRef} {...provided.draggableProps}>
         <div className={styles.trainingExerciseWrapper}>
            <div className={styles.nameWrapper}>
               {isExpanded ? (
                  <button className={styles.actionBtn} onClick={removeExerciseFromTraining}>
                     <Remove />
                  </button>
               ) : (
                  <button {...provided.dragHandleProps} className={styles.actionBtn}>
                     <Drag />
                  </button>
               )}
               <button className={styles.expandBtn} onClick={toggleExpand}>
                  <p className={styles.name}>{`${index + 1}. ${exercise.name}`}</p>
               </button>
            </div>
            <ExerciseDetails details={exercise.details} />
         </div>
         {isExpanded && <ExerciseDetailsForm exercise={exercise} trainingDayId={trainingDayId} />}
      </div>
   );
};

export default TrainingExercise;
