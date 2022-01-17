import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Input from '@/components/core/input/Input';
import Button from '@/components/core/button/Button';
import useModal from '@/components/core/modal/useModal';
import TextArea from '@/components/core/textArea/TextArea';
import { ErrorType } from '@/utils/types/ErrorType';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { authSelector } from '@/features/auth/store/AuthSlice';
import styles from '@/features/settings/components/editProfile/EditProfile.module.scss';
import {
   EditProfileFormValue,
   EditProfileValidationSchema,
} from '@/features/settings/components/editProfile/EditProfileFormTypes';
import { useUpdateProfileMutation } from '@/features/settings//api/settingsApi';
import { getMe } from '@/features/auth/store/getMe';
import UpdateAvatarModal from '@/features/settings/components/updateAvatarModal/UpdateAvatarModal';
import DefaultAvatar from '@/public/icons/default-avatar.svg';

const EditProfile = () => {
   const { me } = useAppSelector(authSelector);
   const dispatch = useAppDispatch();

   const [updateProfile, result] = useUpdateProfileMutation();

   const { isOpen, handleOpenModal, handleCloseModal } = useModal();

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm<EditProfileFormValue>({
      mode: `onSubmit`,
      resolver: yupResolver(EditProfileValidationSchema),
   });

   const onSubmit = (data: EditProfileFormValue) => updateProfile(data);

   useEffect(() => {
      if (me) {
         setValue(`email`, me.email);
         setValue(`firstName`, me.firstName);
         setValue(`lastName`, me.lastName);
         setValue(`phone`, me.phone);
         setValue(`website`, me.website);
         setValue(`bio`, me.bio);
         setValue(`city`, me.city);
      }
   }, [me, setValue]);

   useEffect(() => {
      if (result.isSuccess) dispatch(getMe());
   }, [result]);

   return (
      <div className={styles.formWrapper}>
         <UpdateAvatarModal isOpen={isOpen} handleCloseModal={handleCloseModal} userAvatar={me?.avatarUrl} />

         {me && (
            <div className={styles.userWrapper}>
               {me.avatarUrl ? (
                  <img src={me.avatarUrl} alt="user avatar" className={styles.avatar} />
               ) : (
                  <DefaultAvatar className={styles.avatar} />
               )}
               <div className={styles.usernameWrapper}>
                  <p className={styles.username}>{me.username}</p>
                  <button className={styles.changeAvatarBtn} onClick={handleOpenModal}>
                     Change Profile Photo
                  </button>
               </div>
            </div>
         )}
         <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
               variant="gray"
               type="text"
               placeholder="Enter your first name"
               label="First name"
               size="big"
               radius={5}
               {...register(`firstName`)}
               error={errors?.firstName?.message}
            />
            <Input
               variant="gray"
               type="text"
               placeholder="Enter your last name"
               label="Last name"
               size="big"
               radius={5}
               {...register(`lastName`)}
               error={errors?.lastName?.message}
            />
            <Input
               variant="gray"
               type="text"
               placeholder="Enter your email"
               label="Email"
               size="big"
               radius={5}
               {...register(`email`)}
               error={errors?.email?.message}
            />

            <Input
               variant="gray"
               type="text"
               placeholder="Enter your city"
               label="City"
               size="big"
               radius={5}
               {...register(`city`)}
               error={errors?.city?.message}
            />
            <Input
               variant="gray"
               type="text"
               placeholder="Enter your website"
               label="Website"
               size="big"
               radius={5}
               {...register(`website`)}
               error={errors?.website?.message}
            />

            <Input
               variant="gray"
               type="text"
               placeholder="Enter your phone"
               label="Phone number"
               size="big"
               radius={5}
               {...register(`phone`)}
               error={errors?.phone?.message}
            />

            <TextArea
               variant="gray"
               label="Bio"
               placeholder="Write something about yourself"
               size="big"
               radius={5}
               {...register(`bio`)}
               error={errors?.bio?.message}
            />

            {result.isError && result.error && <p className="error">{(result.error as ErrorType).data.message}</p>}
            {result.isSuccess && <p className="success">Your profile data was updated!</p>}
            <div className={styles.btnWrapper}>
               <Button
                  type="submit"
                  size="small"
                  borderRadius={5}
                  isBold
                  isLoading={result.isLoading}
                  isDisabled={
                     !!errors.bio ||
                     !!errors.city ||
                     !!errors.email ||
                     !!errors.firstName ||
                     !!errors.lastName ||
                     !!errors.phone ||
                     !!errors.website
                  }
               >
                  Update profile
               </Button>
            </div>
         </form>
      </div>
   );
};

export default EditProfile;
