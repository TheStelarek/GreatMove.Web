import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Input from '@/components/core/input/Input';
import styles from '@/features/settings/components/changePassword/ChangePassword.module.scss';
import Button from '@/components/core/button/Button';
import { ErrorType } from '@/utils/types/ErrorType';
import {
   ChangePasswordFormValue,
   ChangePasswordValidationSchema,
} from '@/features/settings/components/changePassword/ChangePasswordFormTypes';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { authSelector } from '@/features/auth/store/AuthSlice';
import DefaultAvatar from '@/public/navbar/default-avatar.svg';
import { useChangePasswordMutation } from '@/features/settings/api/settingsApi';

const ChangePassword = () => {
   const { me } = useAppSelector(authSelector);
   const [changePassword, result] = useChangePasswordMutation();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<ChangePasswordFormValue>({
      mode: `onSubmit`,
      resolver: yupResolver(ChangePasswordValidationSchema),
   });

   const onSubmit = (data: ChangePasswordFormValue) => changePassword(data);

   useEffect(() => {
      if (result.isSuccess) reset();
   }, [result]);

   return (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
         {me && (
            <div className={styles.userWrapper}>
               {me.avatarUrl ? (
                  <img src={me.avatarUrl} alt="user avatar" className={styles.avatar} />
               ) : (
                  <DefaultAvatar className={styles.avatar} />
               )}
               <p className={styles.username}>{me.username}</p>
            </div>
         )}
         <Input
            variant="gray"
            type="password"
            placeholder="Enter your old password"
            label="Old password"
            size="big"
            radius={5}
            {...register(`old_password`)}
            error={errors?.old_password?.message}
         />
         <Input
            variant="gray"
            type="password"
            placeholder="Enter your new password"
            label="New password"
            size="big"
            radius={5}
            {...register(`new_password`)}
            error={errors?.new_password?.message}
         />
         <Input
            variant="gray"
            type="password"
            placeholder="Confirm your password"
            label="Password confirmation"
            size="big"
            radius={5}
            {...register(`password_confirmation`)}
            error={errors?.password_confirmation?.message}
         />
         {result.isError && result.error && <p className="error">{(result.error as ErrorType).data.message}</p>}
         {result.isSuccess && <p className="success">Password changed! Now you can use it.</p>}
         <div className={styles.btnWrapper}>
            <Button
               type="submit"
               size="small"
               borderRadius={5}
               isBold
               isDisabled={!!errors.old_password || !!errors.password_confirmation || !!errors.new_password}
               isLoading={result.isLoading}
            >
               Change password
            </Button>
         </div>
      </form>
   );
};

export default ChangePassword;
