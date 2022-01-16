import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import Input from '@/components/core/input/Input';
import styles from '@/features/auth/components/login/loginForm/LoginForm.module.scss';
import Button from '@/components/core/button/Button';
import { signIn } from '@/features/auth/store/signIn';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { authSelector, clearState } from '@/features/auth/store/AuthSlice';
import { LoginFormValue, LoginValidationSchema } from '@/features/auth/components/login/loginForm/LoginFormTypes';

const LoginForm = () => {
   const dispatch = useAppDispatch();
   const router = useRouter();

   const { isFetching, errorMessage, isSuccess } = useAppSelector(authSelector);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginFormValue>({
      mode: `onBlur`,
      resolver: yupResolver(LoginValidationSchema),
   });

   useEffect(() => {
      if (isSuccess) {
         router.push(`/`);
      }
   }, [isSuccess]);

   useEffect(
      () => () => {
         dispatch(clearState());
      },
      [],
   );

   useEffect(() => {
      if (errorMessage) {
         dispatch(clearState());
      }
   }, [errors.username, errors.password]);

   const onSubmit = (data: LoginFormValue) => {
      dispatch(clearState());
      dispatch(signIn({ ...data }));
   };

   return (
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
         <Input
            variant="gray"
            type="text"
            placeholder="Username"
            size="big"
            {...register(`username`)}
            error={errors?.username?.message}
         />
         <Input
            variant="gray"
            type="password"
            placeholder="Enter password"
            size="big"
            {...register(`password`)}
            error={errors?.password?.message}
         />
         {errorMessage && <p className="error">{errorMessage}</p>}

         <Button
            type="submit"
            size="large"
            isBold
            isFullWidth
            isDisabled={!!errors.password || !!errors.username}
            isLoading={isFetching}
         >
            Submit
         </Button>
      </form>
   );
};

export default LoginForm;
