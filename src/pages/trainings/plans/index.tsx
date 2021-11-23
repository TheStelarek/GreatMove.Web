import { FormEvent, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Cell } from 'react-table';
import styles from '@/pages/trainings/plans/TrainingPlans.module.scss';
import Layout from '@/components/core/layout/Layout';
import Table from '@/components/core/table/Table';
import Button from '@/components/core/button/Button';
import Spinner from '@/components/core/spinner/Spinner';
import Modal from '@/components/core/modal/Modal';
import useModal from '@/components/core/modal/useModal';
import { apiClient } from '@/api/apiClient';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import Edit from '@/public/icons/edit-regular.svg';
import Trash from '@/public/my-shopping-list/trash.svg';

interface TrainingPlan {
   id: string;
   name: string;
   createdAt: string;
}

const TrainingPlans: NextApplicationPage = () => {
   const [plans, setPlans] = useState<TrainingPlan[]>();
   const [pageCount, setPageCount] = useState(0);
   const [selectedPlanId, setSelectedPlanId] = useState<string>(``);
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

   const closeDeleteModal = () => {
      handleCloseModal();
      setSelectedPlanId(``);
   };

   const removeTrainingPlan = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await apiClient.delete(`/training-plans/${selectedPlanId}`);
      const filteredPlans = plans?.filter(({ id }) => id !== selectedPlanId);
      setPlans(filteredPlans);
      closeDeleteModal();
   };

   const fetchTrainingPlans = useCallback(async (pageSize: number, pageIndex: number) => {
      const response = await apiClient.get(`/training-plans/my-plans?take=${pageSize}&skip=${pageIndex * pageSize}`);
      const mappedData = response.data.data.map((plan: TrainingPlan, index: number) => ({
         ...plan,
         createdAt: new Date(plan.createdAt).toLocaleDateString(),
         number: index + 1,
      }));

      setPlans(mappedData);
      setPageCount(Math.ceil(response.data.total / pageSize));
   }, []);

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

         <Modal isOpen={isOpen} handleClose={closeDeleteModal}>
            <div className={styles.deleteModalContainer}>
               <div className={styles.modalHeader}>
                  <span className={styles.heading}>Delete training plan</span>
                  <p className={styles.description}>
                     Are you sure you want to delete this training plan? By doing this you will lose all of your saved
                     data and will not be able to retrive it.
                  </p>
               </div>
               <form className={styles.deletePlanForm} onSubmit={removeTrainingPlan}>
                  <div className={styles.buttonsWrapper}>
                     <button className={styles.cancelBtn} onClick={closeDeleteModal}>
                        Cancel
                     </button>
                     <Button type="submit" variant="warning" borderRadius={5} isBold>
                        Delete plan
                     </Button>
                  </div>
               </form>
            </div>
         </Modal>

         {plans ? (
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
         ) : (
            <Spinner variant="ghost-primary" size="extra-large" />
         )}
      </div>
   );
};

export default TrainingPlans;

TrainingPlans.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};

TrainingPlans.requireAuth = true;
