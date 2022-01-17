import { FC } from 'react';
import Input from '@/components/core/input/Input';
import Button from '@/components/core/button/Button';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { ExerciseType } from '@/features/trainingPlan/utils/types/ExerciseType';
import styles from '@/features/trainingPlan/components/createTrainingPlan/exerciseDetailsForm/ExerciseDetailsForm.module.scss';
import { addNewSet, removeSet, updateExercise } from '@/features/trainingPlan/store/TrainingPlanSlice';
import Plus from '@/public/icons/plus.svg';
import Remove from '@/public/icons/remove.svg';

interface ExerciseDetailsFormProps {
   trainingDayId: string;
   exercise: ExerciseType;
}

const ExerciseDetailsForm: FC<ExerciseDetailsFormProps> = ({ trainingDayId, exercise }) => {
   const dispatch = useAppDispatch();

   const updateField =
      (setId: string, field: 'sets' | 'reps' | 'load' | 'rpe' | 'tempo' | 'rest') =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
         dispatch(updateExercise({ trainingDayId, exerciseId: exercise.id, setId, value: e.target.value, field }));
      };

   const removeSetFromExercise = (setId: string) => {
      dispatch(
         removeSet({
            trainingDayId,
            exerciseId: exercise.id,
            setId,
         }),
      );
   };

   return (
      <div className={styles.exerciseDetailsForm}>
         {!!exercise.details.length && (
            <div className={styles.formHeaders}>
               <span>SETS</span>
               <span>REPS</span>
               <span>LOAD</span>
               <span>RPE</span>
               <span>TEMPO</span>
               <span>REST</span>
               <span />
            </div>
         )}
         {exercise.details.map(({ id, sets, reps, rpe, load, tempo, rest }) => (
            <div key={id} className={styles.inputsWrapper}>
               <div className={styles.inputWrapper}>
                  <Input onChange={updateField(id, `sets`)} type="number" value={sets} size="small" />
               </div>
               <div className={styles.inputWrapper}>
                  <Input onChange={updateField(id, `reps`)} type="number" value={reps} size="small" />
               </div>
               <div className={styles.inputWrapper}>
                  <Input onChange={updateField(id, `load`)} value={load} size="small" />
               </div>
               <div className={styles.inputWrapper}>
                  <Input onChange={updateField(id, `rpe`)} value={rpe} size="small" />
               </div>
               <div className={styles.inputWrapper}>
                  <Input onChange={updateField(id, `tempo`)} value={tempo} size="small" />
               </div>
               <div className={styles.inputWrapper}>
                  <Input onChange={updateField(id, `rest`)} value={rest} size="small" />
               </div>
               <button className={styles.removeBtn} onClick={() => removeSetFromExercise(id)}>
                  <Remove />
               </button>
            </div>
         ))}
         <div className={styles.addSetBtn}>
            <Button
               size="small"
               variant="ghost-primary"
               isBold
               isFullWidth
               leftIcon={<Plus />}
               onClick={() => dispatch(addNewSet({ trainingDayId, exerciseId: exercise.id }))}
            >
               ADD SET
            </Button>
         </div>
      </div>
   );
};

export default ExerciseDetailsForm;
