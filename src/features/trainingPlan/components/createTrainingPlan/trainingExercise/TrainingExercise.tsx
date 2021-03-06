import { FC, useState } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import ExerciseDetails from '@/features/trainingPlan/components/exerciseDetails/ExerciseDetails';
import styles from '@/features/trainingPlan/components/createTrainingPlan/trainingExercise/TrainingExercise.module.scss';
import { ExerciseType } from '@/features/trainingPlan/utils/types/ExerciseType';
import ExerciseDetailsForm from '@/features/trainingPlan/components/createTrainingPlan/exerciseDetailsForm/ExerciseDetailsForm';
import { removeExercise } from '@/features/trainingPlan/store/TrainingPlanSlice';
import Remove from '@/public/icons/remove.svg';
import Drag from '@/public/icons/drag.svg';

interface TrainingExerciseProps {
   trainingDayId: string;
   exercise: ExerciseType;
   index: number;
   provided: DraggableProvided;
}

const TrainingExercise: FC<TrainingExerciseProps> = ({ trainingDayId, exercise, index, provided }) => {
   const [isExpanded, setIsExpanded] = useState<boolean>(false);
   const dispatch = useAppDispatch();

   const toggleExpand = () => setIsExpanded((prevState) => !prevState);

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
