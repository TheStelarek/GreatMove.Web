import CreatePlan from '@/public/illustrations/create-plan.svg';
import Button from '@/components/core/button/Button';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import styles from '@/features/trainingPlan/components/createTrainingPlan/createTrainingPlanBox/CreateTrainingPlanBox.module.scss';
import { createTraining } from '@/features/trainingPlan/store/TrainingPlanSlice';

const CreateTrainingPlanBox = () => {
   const dispatch = useAppDispatch();

   return (
      <div className={styles.createTrainingBox}>
         <CreatePlan className={styles.createIllustration} />
         <p className={styles.shortInfo}>Create your custom training plan!</p>
         <Button size="large" isFullWidth onClick={() => dispatch(createTraining())}>
            Create new plan
         </Button>
      </div>
   );
};

export default CreateTrainingPlanBox;
