import { yupResolver } from '@hookform/resolvers/yup';
import { string, object } from 'yup';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Modal from '@/components/core/modal/Modal';
import useModal from '@/components/core/modal/useModal';
import Button from '@/components/core/button/Button';
import Input from '@/components/core/input/Input';
import styles from '@/components/trainingPlan/saveTraining/SaveTraining.module.scss';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { discardTraining, trainingPlanSelector } from '@/store/trainingPlan/TrainingPlanSlice';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { saveTrainingPlan } from '@/store/trainingPlan/saveTrainingPlan';

interface SaveTrainingFormValue {
   name: string;
}

const SaveTraining = () => {
   const router = useRouter();
   const { isOpen, handleOpenModal, handleCloseModal } = useModal();
   const { training, isFetching, isSuccess, isError, errorMessage } = useAppSelector(trainingPlanSelector);
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
      if (isSuccess) {
         dispatch(discardTraining());
         router.push(`/trainings/create-training-plan`);
      }
   }, [isSuccess, dispatch, router]);

   const closeModal = () => {
      handleCloseModal();
      reset();
   };

   const onSubmit = async ({ name }: SaveTrainingFormValue) => dispatch(saveTrainingPlan({ name, training }));

   return (
      <div className={styles.saveBtnWrapper}>
         <Modal isOpen={isOpen} handleClose={closeModal}>
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
                  {isError && errorMessage && <p>{errorMessage}</p>}
                  <Button
                     type="submit"
                     borderRadius={5}
                     isFullWidth
                     isLoading={isFetching}
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

export default SaveTraining;
