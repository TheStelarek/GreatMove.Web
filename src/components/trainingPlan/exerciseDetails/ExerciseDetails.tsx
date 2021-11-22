import { FC } from 'react';
import { ExerciseDetailsType } from '@/utils/types/ExerciseDetailsType';
import styles from '@/components/trainingPlan/exerciseDetails/ExerciseDetails.module.scss';

interface ExerciseDetailsProps {
   details: ExerciseDetailsType[];
}

const ExerciseDetails: FC<ExerciseDetailsProps> = ({ details }) => {
   const formatDetailsInfo = ({ sets, reps, load, rpe, tempo, rest }: ExerciseDetailsType) => {
      let formattedText = `${sets}s x ${reps}`;
      if (load) formattedText += ` x ${load}kg`;
      if (rpe) formattedText += ` | @RPE${rpe}`;
      if (tempo) formattedText += ` | ${tempo}`;
      if (rest) formattedText += ` | ${rest}s rest`;

      return formattedText;
   };

   return (
      <div className={styles.detailsWrapper}>
         {details.map((exerciseDetails) => (
            <p key={exerciseDetails.id} className={styles.details}>
               {formatDetailsInfo(exerciseDetails)}
            </p>
         ))}
      </div>
   );
};

export default ExerciseDetails;
