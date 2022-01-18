import { yupResolver } from '@hookform/resolvers/yup';
import { string, object } from 'yup';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Modal from '@/components/core/modal/Modal';
import useModal from '@/components/core/modal/useModal';
import Button from '@/components/core/button/Button';
import Input from '@/components/core/input/Input';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import styles from '@/features/trainingPlan/components/createTrainingPlan/saveTrainingPlanModal/SaveTrainingPlanModal.module.scss';
import { discardTraining, trainingPlanSelector } from '@/features/trainingPlan/store/TrainingPlanSlice';
import { useSaveTrainingPlanMutation } from '@/features/trainingPlan/api/trainingPlansApi';
import { ErrorType } from '@/utils/types/ErrorType';

interface SaveTrainingFormValue {
   name: string;
}

const SaveTrainingPlanModal = () => {
   const router = useRouter();
   const [saveTrainingPlan, saveResult] = useSaveTrainingPlanMutation();
   const { isOpen, handleOpenModal, handleCloseModal } = useModal();
   const { training } = useAppSelector(trainingPlanSelector);
   const dispatch = useAppDispatch();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<SaveTrainingFormValue>({
      mode: `onSubmit`,
      resolver: yupResolver(
         object({
            name: string().required(`Training name is required.`),
         }),
      ),
   });

   useEffect(() => {
      if (saveResult.isSuccess) {
         dispatch(discardTraining());
         router.push(`/trainings/plans`);
      }
   }, [saveResult, dispatch, router]);

   const closeModal = () => {
      handleCloseModal();
      reset();
   };

   const onSubmit = async ({ name }: SaveTrainingFormValue) => saveTrainingPlan({ name, training });

   return (
      <div className={styles.wrapper}>
         <Modal rounded isOpen={isOpen} handleClose={closeModal}>
            <form className={styles.saveForm} onSubmit={handleSubmit(onSubmit)}>
               <div className={styles.titleWrapper}>
                  <Input
                     variant="gray"
                     type="text"
                     label="Training name"
                     placeholder="Enter a training name"
                     size="big"
                     {...register(`name`)}
                     error={errors?.name?.message}
                  />
               </div>
               <div className={styles.actionsWrapper}>
                  {saveResult.isError && saveResult.error && (
                     <p className="error">{(saveResult.error as ErrorType).data.message}</p>
                  )}

                  <Button
                     type="submit"
                     borderRadius={5}
                     isFullWidth
                     isLoading={saveResult.isLoading}
                     isDisabled={Object.values(training).length === 0 || !!errors.name}
                  >
                     Save now
                  </Button>
                  <button className={styles.cancelBtn} onClick={closeModal}>
                     Cancel
                  </button>
               </div>
            </form>
         </Modal>
         <Button size="small" isBold isFullWidth onClick={handleOpenModal}>
            Save plan
         </Button>
      </div>
   );
};

export default SaveTrainingPlanModal;
