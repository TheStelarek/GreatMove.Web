import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import Radio from '@/components/core/radio/Radio';
import Input from '@/components/core/input/Input';
import Button from '@/components/core/button/Button';
import Modal from '@/components/core/modal/Modal';
import { ErrorType } from '@/utils/types/ErrorType';
import styles from '@/features/exercise/components/addExerciseModal/AddExerciseModal.module.scss';
import { useAddExerciseMutation, useUpdateExerciseMutation } from '@/features/exercise/api/exercisesApi';
import { Exercise } from '@/features/exercise/utils/types/Exercise';
import { AddExerciseFormValue } from '@/features/exercise/components/addExerciseModal/AddExerciseFormValue';

interface AddExerciseModalProps {
   isOpen: boolean;
   handleCloseModal: () => void;
   exercise?: Exercise;
   setSelectedExerciseId: Dispatch<SetStateAction<string>>;
   setSelectedExercise: Dispatch<SetStateAction<Exercise | undefined>>;
   fetchExercises: (pageSize: number, pageIndex: number) => Promise<void>;
}

const AddExerciseModal: FC<AddExerciseModalProps> = ({
   isOpen,
   handleCloseModal,
   exercise,
   setSelectedExerciseId,
   setSelectedExercise,
   fetchExercises,
}) => {
   const [addExercise, result] = useAddExerciseMutation();
   const [updateExercise, updateResult] = useUpdateExerciseMutation();

   const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
   } = useForm<AddExerciseFormValue>({
      mode: `onSubmit`,
      resolver: yupResolver(
         object({
            name: string().required(`Exercise name is required`),
            type: string().required(`Type must be set`).nullable(),
         }),
      ),
   });

   const onSubmit = async ({ name, type }: AddExerciseFormValue) =>
      exercise ? updateExercise({ name, type, exerciseId: exercise.id }) : addExercise({ name, type });

   const close = () => {
      handleCloseModal();
      setSelectedExerciseId(``);
      setSelectedExercise(undefined);
      reset();
      fetchExercises(10, 0);
   };

   useEffect(() => {
      if (result.isSuccess || updateResult.isSuccess) {
         close();
      }
   }, [result, updateResult]);

   useEffect(() => {
      if (exercise) {
         setValue(`name`, exercise.name);
         setValue(`type`, exercise.type?.name || ``);
      }
   }, [exercise, setValue]);

   return (
      <Modal isOpen={isOpen} handleClose={close}>
         <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
               <span className={styles.heading}>Create exercise</span>
               <p className={styles.description}>Add new exercise to your database</p>
            </div>
            <form className={styles.addForm} onSubmit={handleSubmit(onSubmit)}>
               <div className={styles.nameWrapper}>
                  <Input label="Exercise name" placeholder="Enter a exercise name" size="big" {...register(`name`)} />
                  {errors && errors.name && <p className="error">{errors.name.message} </p>}
               </div>

               <div className={styles.typeContainer}>
                  <div className={styles.typeWrapper}>
                     <Radio fontVariant="p1" value="Push" label="Push" {...register(`type`)} />
                     <Radio fontVariant="p1" value="Pull" label="Pull" {...register(`type`)} />
                  </div>
                  {errors && errors.type && <p className="error">{errors.type.message} </p>}
               </div>

               {result.isError && result.error && <p className="error">{(result.error as ErrorType).data.message}</p>}
               {updateResult.isError && updateResult.error && (
                  <p className="error">{(updateResult.error as ErrorType).data.message}</p>
               )}

               <div className={styles.buttonsWrapper}>
                  <button className={styles.cancelBtn} onClick={close}>
                     Cancel
                  </button>
                  <Button type="submit" borderRadius={5} isBold isLoading={result.isLoading}>
                     {exercise ? `Update` : `Save`}
                  </Button>
               </div>
            </form>
         </div>
      </Modal>
   );
};

export default AddExerciseModal;
