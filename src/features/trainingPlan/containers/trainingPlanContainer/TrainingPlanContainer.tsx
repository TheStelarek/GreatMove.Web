import { skipToken } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/router';
import Spinner from '@/components/core/spinner/Spinner';
import { ErrorType } from '@/utils/types/ErrorType';
import styles from '@/features/trainingPlan/containers/trainingPlanContainer/TrainingPlanContainer.module.scss';
import Workout from '@/features/trainingPlan/components/workout/Workout';
import { useGetTrainingPlanByIdQuery } from '@/features/trainingPlan/api/trainingPlansApi';

const TrainingPlanContainer = () => {
   const router = useRouter();
   const { data, isLoading, isError, error } = useGetTrainingPlanByIdQuery(
      router.query.id ? (router.query.id as string) : skipToken,
   );

   return (
      <div className={styles.planContainer}>
         {isLoading && (
            <div className={styles.wrapper}>
               <Spinner size="extra-large" variant="ghost-secondary" />
            </div>
         )}
         {isError && error && (
            <div className={styles.wrapper}>
               <p className="error">{(error as ErrorType).data.message}</p>
            </div>
         )}

         {data && (
            <div className={styles.planWrapper}>
               <h4>{data.name.toUpperCase()}</h4>
               {!!data.trainingDays.length && (
                  <ul className={styles.trainingDaysList}>
                     {data.trainingDays.map((trainingDay) => (
                        <Workout key={trainingDay.id} day={trainingDay} />
                     ))}
                  </ul>
               )}
            </div>
         )}
      </div>
   );
};

export default TrainingPlanContainer;
