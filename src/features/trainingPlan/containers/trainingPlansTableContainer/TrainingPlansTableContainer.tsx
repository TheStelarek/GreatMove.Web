import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Cell } from 'react-table';
import Table from '@/components/core/table/Table';
import Button from '@/components/core/button/Button';
import Spinner from '@/components/core/spinner/Spinner';
import useModal from '@/components/core/modal/useModal';
import DeleteModal from '@/components/core/deleteModal/DeleteModal';
import { ErrorType } from '@/utils/types/ErrorType';
import styles from '@/features/trainingPlan/containers/trainingPlansTableContainer/TrainingPlansTableContainer.module.scss';
import { useDeleteTrainingPlanMutation } from '@/features/trainingPlan/api/trainingPlansApi';
import useTrainingPlans, { TrainingPlan } from '@/features/trainingPlan/hooks/useTrainingPlans';
import View from '@/public/icons/view.svg';
import Edit from '@/public/icons/edit-regular.svg';
import Trash from '@/public/icons/trash.svg';

const TrainingPlansTableContainer = () => {
   const { plans, pageCount, error, isLoading, fetchTrainingPlans } = useTrainingPlans();
   const [selectedPlanId, setSelectedPlanId] = useState<string>(``);

   const [deleteTrainingPlan, deleteResult] = useDeleteTrainingPlanMutation();
   const { isOpen, handleOpenModal, handleCloseModal } = useModal();

   const openDeleteModal = useCallback(
      (selectedId: string) => {
         handleOpenModal();
         setSelectedPlanId(selectedId);
      },
      [handleOpenModal],
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
            Header: `CREATED`,
            accessor: `createdAt` as const,
         },
         {
            Header: ``,
            accessor: `actions` as const,
            disableSortBy: true,
            Cell: function ActionButtons({ cell }: { cell: Cell<TrainingPlan> }) {
               return (
                  <div className={styles.actionsContainer}>
                     <Link
                        href={`/trainings/plan/${cell.row.original.id}/${cell.row.original.name.replace(/ /g, `-`)}`}
                     >
                        <button>
                           <View className={styles.icon} />
                        </button>
                     </Link>
                     <button>
                        <Edit className={styles.icon} />
                     </button>
                     <button onClick={() => openDeleteModal(cell.row.original.id)}>
                        <Trash className={styles.icon} />
                     </button>
                  </div>
               );
            },
         },
      ],
      [openDeleteModal],
   );

   useEffect(() => {
      if (deleteResult.isSuccess) {
         handleCloseModal();
         setSelectedPlanId(``);
      }
   }, [deleteResult]);

   useEffect(() => {
      fetchTrainingPlans(10, 0);
   }, []);

   return (
      <div className={styles.trainingPlansContainer}>
         <div className={styles.header}>
            <p className={styles.pageName}>Training plans</p>
            <Link href="/trainings/create-training-plan">
               <Button borderRadius={5} size="small">
                  Create plan
               </Button>
            </Link>
         </div>
         <DeleteModal
            isOpen={isOpen}
            isLoading={deleteResult.isLoading}
            closeModal={handleCloseModal}
            remove={() => deleteTrainingPlan({ trainingPlanId: selectedPlanId })}
            deleteError={(deleteResult?.error as ErrorType)?.data?.message}
            heading="Delete training plan"
         />

         {error && <p className="error">{error}</p>}
         {plans && (
            <Table
               hasGlobalFilter
               hasPagination
               isSortable
               isEquallyGrow
               columns={columns}
               data={plans}
               fetchData={fetchTrainingPlans}
               pageCount={pageCount}
            />
         )}

         {isLoading && !plans && <Spinner variant="ghost-primary" size="extra-large" />}
      </div>
   );
};

export default TrainingPlansTableContainer;
