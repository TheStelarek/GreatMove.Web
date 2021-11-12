import { ReactElement } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Layout from '@/components/core/layout/Layout';
import NewTraining from '@/components/trainingPlan/newTraining/NewTraining';
import TrainingDay from '@/components/trainingPlan/trainingDay/TrainingDay';
import SaveTraining from '@/components/trainingPlan/saveTraining/SaveTraining';
import CreatePlanBox from '@/components/trainingPlan/createPlanBox/CreatePlanBox';
import styles from '@/pages/create-training-plan/CreateTrainingPlan.module.scss';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { discardTraining, dragExercise, trainingPlanSelector } from '@/store/trainingPlan/TrainingPlanSlice';

const CreateTrainingPlan = () => {
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
                  <SaveTraining />
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
                  <NewTraining />
               </div>
            </div>
         ) : (
            <CreatePlanBox />
         )}
      </div>
   );
};

export default CreateTrainingPlan;

CreateTrainingPlan.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};
