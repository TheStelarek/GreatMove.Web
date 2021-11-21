import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import styles from '@/pages/trainings/plans/TrainingPlans.module.scss';
import Layout from '@/components/core/layout/Layout';
import Table from '@/components/core/table/Table';
import Button from '@/components/core/button/Button';
import Spinner from '@/components/core/spinner/Spinner';
import { apiClient } from '@/api/apiClient';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';

interface TrainingPlans {
   id: string;
   name: string;
   createdAt: string;
}

const TrainingPlans: NextApplicationPage = () => {
   const [plans, setPlans] = useState<TrainingPlans[] | null>(null);
   const [pageCount, setPageCount] = useState(0);

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
         },
      ],
      [],
   );

   const fetchTrainingPlans = useCallback(async (pageSize: number, pageIndex: number) => {
      const response = await apiClient.get(`/training-plans/my-plans?take=${pageSize}&skip=${pageIndex * pageSize}`);
      const mappedData = response.data.data.map((plan: TrainingPlans, index: number) => ({
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
