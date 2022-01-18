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
import { useDeleteTrainingPlanMutation, useGetMyPlansQuery } from '@/features/trainingPlan/api/trainingPlansApi';
import { TrainingPlanResponse } from '@/features/trainingPlan/utils/types/TrainingPlanResponse';
import View from '@/public/icons/view.svg';
import Trash from '@/public/icons/trash.svg';

const TrainingPlansTableContainer = () => {
   const [pageSize, setPageSize] = useState(10);
   const [pageIndex, setPageIndex] = useState(0);
   const [plans, setPlans] = useState<TrainingPlanResponse[]>([]);
   const [pageCount, setPageCount] = useState(1);
   const { data, isLoading, isError, error } = useGetMyPlansQuery({ pageSize, pageIndex });
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
            Cell: function ActionButtons({ cell }: { cell: Cell<TrainingPlanResponse> }) {
               return (
                  <div className={styles.actionsContainer}>
                     <Link
                        href={`/trainings/plan/${cell.row.original.id}/${cell.row.original.name.replace(/ /g, `-`)}`}
                     >
                        <button>
                           <View className={styles.icon} />
                        </button>
                     </Link>
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
      if (data) {
         const mappedData = data.data.map((plan: TrainingPlanResponse, index: number) => ({
            ...plan,
            createdAt: new Date(plan.createdAt).toLocaleDateString(),
            number: index + 1,
         }));

         const pagesCount = Math.ceil(data.total / pageSize);
         setPlans(mappedData);
         setPageCount(pagesCount === 0 ? 1 : pagesCount);
      }
   }, [data]);

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

         {isError && error && <p className="error">{(error as ErrorType).data.message}</p>}
         {data && plans && (
            <Table
               hasGlobalFilter
               hasPagination
               isSortable
               isEquallyGrow
               columns={columns}
               data={plans}
               setSize={setPageSize}
               setIndex={setPageIndex}
               pageCount={pageCount}
            />
         )}

         {isLoading && <Spinner variant="ghost-primary" size="extra-large" />}
      </div>
   );
};

export default TrainingPlansTableContainer;
