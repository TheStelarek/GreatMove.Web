import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import styles from '@/features/trainingPlan/containers/createTrainingPlanContainer/CreateTrainingPlanContainer.module.scss';
import CreateTrainingPlanBox from '@/features/trainingPlan/components/createTrainingPlan/createTrainingPlanBox/CreateTrainingPlanBox';
import NewTrainingDay from '@/features/trainingPlan/components/createTrainingPlan/newTrainingDay/NewTrainingDay';
import SaveTrainingPlanModal from '@/features/trainingPlan/components/createTrainingPlan/saveTrainingPlanModal/SaveTrainingPlanModal';
import TrainingDay from '@/features/trainingPlan/components/createTrainingPlan/trainingDay/TrainingDay';
import { discardTraining, dragExercise, trainingPlanSelector } from '@/features/trainingPlan/store/TrainingPlanSlice';
import DeleteModal from '@/components/core/deleteModal/DeleteModal';
import useModal from '@/components/core/modal/useModal';

const CreateTrainingPlanContainer = () => {
   const { isCreatingPlan, training } = useAppSelector(trainingPlanSelector);
   const dispatch = useAppDispatch();
   const { isOpen, handleOpenModal, handleCloseModal } = useModal();

   return (
      <div className={styles.createPlanContainer}>
         {isCreatingPlan ? (
            <div className={styles.trainingContainer}>
               <div className={styles.actionsButtons}>
                  <DeleteModal
                     isOpen={isOpen}
                     closeModal={handleCloseModal}
                     remove={() => dispatch(discardTraining())}
                     heading="Discard training plan"
                     description="Are you sure you want to delete this? By doing this you will lose all of your data and will not be able to retrive it."
                  />
                  <button className={styles.discardBtn} onClick={handleOpenModal}>
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
