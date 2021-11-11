import { yupResolver } from '@hookform/resolvers/yup';
import { string, object } from 'yup';
import { useForm } from 'react-hook-form';
import Modal from '@/components/core/modal/Modal';
import useModal from '@/components/core/modal/useModal';
import Button from '@/components/core/button/Button';
import Input from '@/components/core/input/Input';
import styles from '@/components/trainingPlan/saveTraining/SaveTraining.module.scss';

interface SaveTrainingFormValue {
   name: string;
}

const SaveTraining = () => {
   const { isOpen, handleOpenModal, handleCloseModal } = useModal();

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm<SaveTrainingFormValue>({
      mode: `onSubmit`,
      resolver: yupResolver(
         object({
            name: string().required(`Training name is required.`),
         }),
      ),
   });

   const closeModal = () => {
      handleCloseModal();
      setValue(`name`, ``);
   };

   const onSubmit = (data: SaveTrainingFormValue) => {
      alert(data.name);
   };

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
                  <Button type="submit" borderRadius={5} isFullWidth>
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
