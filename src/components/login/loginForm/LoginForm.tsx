import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import Input from '@/components/core/input/Input';
import styles from '@/components/login/loginForm/LoginForm.module.scss';
import Spinner from '@/components/core/spinner/Spinner';
import { signIn } from '@/store/auth/signIn';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { authSelector, clearState } from '@/store/auth/AuthSlice';
import { LoginFormValue, LoginValidationSchema } from './LoginFormTypes';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { isFetching, isError, errorMessage, isSuccess } =
    useAppSelector(authSelector);
  const router = useRouter();

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

  const onSubmit = (data: LoginFormValue) => {
    dispatch(clearState());
    dispatch(signIn({ ...data }));
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <Input
        gray
        type="text"
        placeholder="Username"
        {...register(`username`)}
        error={errors?.username?.message}
      />
      <Input
        gray
        type="password"
        placeholder="Enter password"
        {...register(`password`)}
        error={errors?.password?.message}
      />
      {isError && (
        <p role="alert" className={styles.error}>
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        className={styles.formBtn}
        disabled={!!errors.password || !!errors.username}
      >
        {isFetching ? <Spinner /> : `Submit`}
      </button>
    </form>
  );
};

export default LoginForm;
