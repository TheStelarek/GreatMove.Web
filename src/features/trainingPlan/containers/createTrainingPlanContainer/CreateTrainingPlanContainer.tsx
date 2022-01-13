import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import styles from '@/features/trainingPlan/containers/createTrainingPlanContainer/CreateTrainingPlanContainer.module.scss';
import CreateTrainingPlanBox from '@/features/trainingPlan/components/createTrainingPlanBox/CreateTrainingPlanBox';
import NewTrainingDay from '@/features/trainingPlan/components/newTrainingDay/NewTrainingDay';
import SaveTrainingPlanModal from '@/features/trainingPlan/components/saveTrainingPlanModal/SaveTrainingPlanModal';
import TrainingDay from '@/features/trainingPlan/components/trainingDay/TrainingDay';
import { discardTraining, dragExercise, trainingPlanSelector } from '@/features/trainingPlan/store/TrainingPlanSlice';

const CreateTrainingPlanContainer = () => {
   const { isCreatingPlan, training } = useAppSelector(trainingPlanSelector);
   const dispatch = useAppDispatch();

   return (
      <div className={styles.createPlanContainer}>
         {isCreatingPlan ? (
            <div className={styles.trainingContainer}>
               <div className={styles.actionsButtons}>
                  <button className={styles.discardBtn} onClick={() => dispatch(discardTraining())}>
                     Discard
                  </button>
                  <SaveTrainingPlanModal />
               </div>
               <div className={styles.trainingWrapper}>
                  {!!Object.entries(training).length && (
                     <DragDropContext onDragEnd={(result) => dispatch(dragExercise(result))}>
                        <div className={styles.trainingDayList}>
                           {Object.entries(training).map(([columnId, { items, name }]) => (
                              <Droppable droppableId={columnId} key={columnId}>
                                 {(provided) => (
                                    <TrainingDay
                                       provided={provided}
                                       key={columnId}
                                       trainingDayId={columnId}
                                       trainingDayName={name}
                                       exercises={items}
                                    />
                                 )}
                              </Droppable>
                           ))}
                        </div>
                     </DragDropContext>
                  )}
                  <NewTrainingDay />
               </div>
            </div>
         ) : (
            <CreateTrainingPlanBox />
         )}
      </div>
   );
};

export default CreateTrainingPlanContainer;
