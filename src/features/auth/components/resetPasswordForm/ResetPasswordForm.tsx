import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Input from '@/components/core/input/Input';
import Button from '@/components/core/button/Button';
import styles from '@/features/auth/components/login/loginForm/LoginForm.module.scss';
import { useResetPasswordMutation } from '@/features/auth/api/authApi';
import {
   ResetPasswordFormValue,
   ResetPasswordValidationSchema,
} from '@/features/auth/components/resetPasswordForm/ResetPasswordFormTypes';
import { ErrorType } from '@/utils/types/ErrorType';

const ResetPasswordForm: FC<{ token: string }> = ({ token }) => {
   const [resetPassword, result] = useResetPasswordMutation();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ResetPasswordFormValue>({
      mode: `onSubmit`,
      resolver: yupResolver(ResetPasswordValidationSchema),
   });

   const onSubmit = (data: ResetPasswordFormValue) => resetPassword({ ...data, token });

   return (
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
         <Input
            variant="gray"
            type="password"
            placeholder="Password"
            size="big"
            {...register(`password`)}
            error={errors?.password?.message}
         />
         <Input
            variant="gray"
            type="password"
            placeholder="Password confirmation"
            size="big"
            {...register(`password_confirmation`)}
            error={errors?.password_confirmation?.message}
         />
         {result.isError && result.error && <p className="error">{(result.error as ErrorType).data.message}</p>}
         {result.isSuccess && <p className="success">Password changed! Now you can use it.</p>}
         <Button
            type="submit"
            size="large"
            isBold
            isFullWidth
            isDisabled={!!errors.password || !!errors.password_confirmation}
            isLoading={result.isLoading}
         >
            Reset
         </Button>
      </form>
   );
};

export default ResetPasswordForm;
