import { FC } from 'react';
import { DroppableProvided, Draggable } from 'react-beautiful-dnd';
import styles from '@/components/trainingPlan/trainingDay/TrainingDay.module.scss';
import TrainingExercise from '@/components/trainingPlan/trainingExercise/TrainingExercise';
import AddExercise from '@/components/trainingPlan/addExercise/AddExercise';
import { ExerciseType } from '@/utils/types/ExerciseType';
import Trash from '@/public/my-shopping-list/trash.svg';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { removeTrainingDay } from '@/store/trainingPlan/TrainingPlanSlice';
import TrainingDayName from '../trainingDayName/TrainingDayName';

interface TrainingDayProps {
   exercises: ExerciseType[];
   trainingDayName: string;
   trainingDayId: string;
   provided: DroppableProvided;
}

const TrainingDay: FC<TrainingDayProps> = ({ exercises, trainingDayName, trainingDayId, provided }) => {
   const dispatch = useAppDispatch();

   const remove = () => dispatch(removeTrainingDay(trainingDayId));

   return (
      <div className={styles.trainingDayContainer} {...provided.droppableProps} ref={provided.innerRef}>
         <TrainingDayName trainingDayId={trainingDayId} trainingName={trainingDayName} />
         <div className={styles.trainingDayWrapper}>
            {exercises.map((exercise, index) => (
               <Draggable key={exercise.id} draggableId={exercise.id} index={index}>
                  {(providedd) => (
                     <TrainingExercise
                        key={exercise.id}
                        provided={providedd}
                        exercise={exercise}
                        trainingDayId={trainingDayId}
                        index={index}
                     />
                  )}
               </Draggable>
            ))}
            {provided.placeholder}
            <AddExercise trainingDayId={trainingDayId} />
         </div>
         <button type="button" className={styles.trashButton} onClick={remove}>
            <Trash className={styles.trashIcon} />
         </button>
      </div>
   );
};

export default TrainingDay;
