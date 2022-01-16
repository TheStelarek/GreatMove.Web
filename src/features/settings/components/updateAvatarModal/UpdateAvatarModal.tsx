import Button from '@/components/core/button/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, FC, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import styles from '@/features/settings/components/updateAvatarModal/UpdateAvatarModal.module.scss';
import PictureFile from '@/public/create-recipe/photo-file.svg';
import Divider from '@/components/core/divider/Divider';
import Modal from '@/components/core/modal/Modal';
import { PICTURE_SUPPORTED_FORMATS } from '@/features/settings/components/updateAvatarModal/pictureValidationData';
import {
   UpdateAvatarModalFormValue,
   UpdateAvatarModalValidationSchema,
} from '@/features/settings/components/updateAvatarModal/UpdateAvatarModalFormValue';
import { useUpdateAvatarMutation } from '@/features/settings/api/settingsApi';
import { ErrorType } from '@/utils/types/ErrorType';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { getMe } from '@/features/auth/store/getMe';

interface UpdateAvatarModalProps {
   isOpen: boolean;
   handleCloseModal: () => void;
   userAvatar?: string;
}

const UpdateAvatarModal: FC<UpdateAvatarModalProps> = ({ isOpen, handleCloseModal, userAvatar }) => {
   const [updateAvatar, updateResult] = useUpdateAvatarMutation();
   const dispatch = useAppDispatch();
   const {
      setValue,
      watch,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<UpdateAvatarModalFormValue>({
      mode: `onSubmit`,
      resolver: yupResolver(UpdateAvatarModalValidationSchema),
   });
   const avatar = watch(`picture`);

   const onDrop = useCallback(
      (droppedFiles) => {
         setValue(`picture`, droppedFiles, { shouldValidate: true });
      },
      [setValue],
   );

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      maxFiles: 1,
      accept: PICTURE_SUPPORTED_FORMATS,
   });

   const onSubmit = (data: UpdateAvatarModalFormValue) => {
      const reader = new FileReader();

      reader.readAsDataURL(data.picture[`0`]);
      reader.onloadend = async () => {
         updateAvatar({ picture: reader.result });
      };
   };

   useEffect(() => {
      if (updateResult.isSuccess) {
         handleCloseModal();
         reset();
         dispatch(getMe());
      }
   }, [updateResult]);

   return (
      <Modal rounded isOpen={isOpen} handleClose={handleCloseModal}>
         <form className={styles.uploadPhotoContainer} onSubmit={handleSubmit(onSubmit)}>
            <span className={styles.uploadTitle}>Set your avatar!</span>
            <p className={styles.info}>Photo should be jpg/jpeg/png and max 2.5mb size</p>
            <div className={styles.uploadPhotoWrapper}>
               <div {...getRootProps()} className={styles.upload}>
                  {avatar && !!Object.entries(avatar)?.length ? (
                     Object.entries(avatar).map(([, file]) => (
                        <img
                           alt="user avatar"
                           key={file.name}
                           src={URL.createObjectURL(file)}
                           className={styles.uploadArt}
                        />
                     ))
                  ) : (
                     <>
                        {userAvatar ? (
                           <img alt="user avatar" src={userAvatar} className={styles.uploadArt} />
                        ) : (
                           <PictureFile className={styles.uploadArt} />
                        )}
                     </>
                  )}
                  <input {...getInputProps()} />
                  <p className={styles.description}>Drag & drop your files here</p>
                  <div className={styles.dividerWrapper}>
                     <Divider text="or" />
                  </div>
                  <Button size="regular" borderRadius={8} isBold>
                     Browse files
                  </Button>
               </div>
            </div>

            {errors && errors.picture && <p className="error">{errors.picture.message} </p>}

            {updateResult.isError && updateResult.error && (
               <p className="error">{(updateResult.error as ErrorType).data.message}</p>
            )}
            <div className={styles.btnsWrapper}>
               <button onClick={handleCloseModal} className={styles.cancelBtn}>
                  Close
               </button>
               <Button
                  type="submit"
                  size="small"
                  borderRadius={5}
                  isBold
                  isDisabled={!!errors.picture}
                  isLoading={updateResult.isLoading}
               >
                  Update avatar
               </Button>
            </div>
         </form>
      </Modal>
   );
};

export default UpdateAvatarModal;
