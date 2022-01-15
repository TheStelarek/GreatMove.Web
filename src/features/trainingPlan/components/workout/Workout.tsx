import { TrainingDay } from '@/features/trainingPlan/utils/types/TrainingDay';
import { FC } from 'react';
import styles from '@/features/trainingPlan/components/workout/Workout.module.scss';
import { capitalize } from '@/utils/functions/capitalize';
import ExerciseDetails from '@/features/trainingPlan/components/exerciseDetails/ExerciseDetails';

interface WorkoutProps {
   day: TrainingDay;
}

const Workout: FC<WorkoutProps> = ({ day }) =>
   day.items.length ? (
      <div className={styles.trainingDaysListItem}>
         <span className={styles.name}>{day.name}</span>
         <div className={styles.wrapper}>
            {day.items.map((item, index) => (
               <div key={item.id} className={styles.trainingExerciseContainer}>
                  <div className={styles.trainingExerciseWrapper}>
                     <p className={styles.exerciseName}>{`${index + 1}. ${capitalize(item.exercise.name)}`}</p>
                     <ExerciseDetails details={item.details} />
                  </div>
               </div>
            ))}
         </div>
      </div>
   ) : null;

export default Workout;
