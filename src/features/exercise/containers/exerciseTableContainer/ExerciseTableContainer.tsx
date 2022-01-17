import { useCallback, useEffect, useMemo, useState } from 'react';
import { Cell } from 'react-table';
import styles from '@/pages/trainings/exercises/Exercises.module.scss';
import Table from '@/components/core/table/Table';
import Button from '@/components/core/button/Button';
import Spinner from '@/components/core/spinner/Spinner';
import useModal from '@/components/core/modal/useModal';
import DeleteModal from '@/components/core/deleteModal/DeleteModal';
import { ErrorType } from '@/utils/types/ErrorType';
import { Exercise } from '@/features/exercise/utils/types/Exercise';
import AddExerciseModal from '@/features/exercise/components/addExerciseModal/AddExerciseModal';
import { useDeleteExerciseMutation } from '@/features/exercise/api/exercisesApi';
import useExercises from '@/features/exercise/hooks/useExercises';
import Edit from '@/public/icons/edit-regular.svg';
import Trash from '@/public/icons/trash.svg';

const ExerciseTableContainer = () => {
   const { exercises, pageCount, error, isLoading, fetchExercises } = useExercises();
   const [selectedExerciseId, setSelectedExerciseId] = useState(``);
   const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
   const [removeExerciseId, setRemoveExerciseId] = useState(``);

   const { isOpen, handleOpenModal, handleCloseModal } = useModal();
   const {
      isOpen: isOpenDelete,
      handleOpenModal: handleOpenDeleteModal,
      handleCloseModal: handleCloseDeleteModal,
   } = useModal();

   const [deleteExercise, deleteResult] = useDeleteExerciseMutation();

   const openModal = useCallback(
      (selectedId: string) => {
         handleOpenModal();
         setSelectedExerciseId(selectedId);
      },
      [handleOpenModal],
   );

   const openDeleteModal = useCallback(
      (selectedId: string) => {
         handleOpenDeleteModal();
         setRemoveExerciseId(selectedId);
      },
      [handleOpenDeleteModal],
   );

   const columns = useMemo(
      () => [
         {
            Header: `NUMBER`,
            accessor: `number` as const,
         },
         {
            Header: `NAME`,
            accessor: `name` as const,
         },
         {
            Header: `TYPE`,
            accessor: `type.name` as const,
         },
         {
            Header: ``,
            accessor: `actions` as const,
            disableSortBy: true,
            Cell: function ActionButtons({ cell }: { cell: Cell<Exercise> }) {
               return (
                  <div className={styles.actionsContainer}>
                     <button>
                        <Edit className={styles.icon} onClick={() => openModal(cell.row.original.id)} />
                     </button>
                     <button>
                        <Trash className={styles.icon} onClick={() => openDeleteModal(cell.row.original.id)} />
                     </button>
                  </div>
               );
            },
         },
      ],
      [openModal, openDeleteModal],
   );

   useEffect(() => {
      if (selectedExerciseId) {
         const filteredExercise = exercises?.filter(({ id }) => id === selectedExerciseId);
         if (filteredExercise) {
            setSelectedExercise(filteredExercise[0]);
            handleOpenModal();
         }
      }
   }, [exercises, handleOpenModal, selectedExerciseId]);

   useEffect(() => {
      if (deleteResult.isSuccess) {
         handleCloseDeleteModal();
         setRemoveExerciseId(``);
      }
   }, [deleteResult]);

   useEffect(() => {
      fetchExercises(10, 0);
   }, []);

   return (
      <div className={styles.exercisesContainer}>
         <div className={styles.header}>
            <p className={styles.pageName}>Exercises</p>
            <Button borderRadius={5} size="small" onClick={handleOpenModal}>
               Create exercise
            </Button>
         </div>

         <AddExerciseModal
            isOpen={isOpen}
            handleCloseModal={handleCloseModal}
            setSelectedExerciseId={setSelectedExerciseId}
            setSelectedExercise={setSelectedExercise}
            exercise={selectedExercise}
            fetchExercises={fetchExercises}
         />
         <DeleteModal
            isOpen={isOpenDelete}
            isLoading={deleteResult.isLoading}
            closeModal={handleCloseDeleteModal}
            remove={() => deleteExercise({ exerciseId: removeExerciseId })}
            deleteError={(deleteResult?.error as ErrorType)?.data?.message}
            heading="Delete exercise"
         />
         {error && <p className="error">{error}</p>}
         {exercises && (
            <Table
               hasGlobalFilter
               hasPagination
               isSortable
               isEquallyGrow
               columns={columns}
               data={exercises}
               fetchData={fetchExercises}
               pageCount={pageCount}
            />
         )}

         {isLoading && !exercises && <Spinner variant="ghost-primary" size="extra-large" />}
      </div>
   );
};

export default ExerciseTableContainer;
