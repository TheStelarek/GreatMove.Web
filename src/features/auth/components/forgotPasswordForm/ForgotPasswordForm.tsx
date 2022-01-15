import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Input from '@/components/core/input/Input';
import styles from '@/features/auth/components/forgotPasswordForm/ForgotPasswordForm.module.scss';
import Button from '@/components/core/button/Button';
import { useRecoverPasswordMutation } from '@/features/auth/api/authApi';
import {
   ForgotPasswordFormValue,
   ForgotPasswordValidationSchema,
} from '@/features/auth/components/forgotPasswordForm/ForgotPasswordFormTypes';
import { ErrorType } from '@/utils/types/ErrorType';

const ForgotPasswordForm = () => {
   const [recoverPassword, result] = useRecoverPasswordMutation();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ForgotPasswordFormValue>({
      mode: `onSubmit`,
      resolver: yupResolver(ForgotPasswordValidationSchema),
   });

   const onSubmit = (data: ForgotPasswordFormValue) => recoverPassword({ ...data });

   return (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
         <Input
            variant="gray"
            type="text"
            placeholder="Email"
            size="big"
            {...register(`email`)}
            error={errors?.email?.message}
         />
         {result.isError && result.error && <p className="error">{(result.error as ErrorType).data.message}</p>}
         {result.isSuccess && <p className="success">Check your email!</p>}
         <Button type="submit" size="large" isBold isFullWidth isDisabled={!!errors.email} isLoading={result.isLoading}>
            Recover
         </Button>
      </form>
   );
};

export default ForgotPasswordForm;
