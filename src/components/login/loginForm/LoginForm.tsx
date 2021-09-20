import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Input from '@/components/core/input/Input';
import styles from '@/components/login/loginForm/LoginForm.module.scss';
import { LoginFormValue, LoginValidationSchema } from './LoginFormTypes';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValue>({
    mode: `onBlur`,
    resolver: yupResolver(LoginValidationSchema),
  });

  const onSubmit = (data: LoginFormValue) => alert(data);

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <Input
        gray
        type="text"
        placeholder="Email address"
        {...register(`email`)}
        error={errors?.email?.message}
      />
      <Input
        gray
        type="password"
        placeholder="Enter password"
        {...register(`password`)}
        error={errors?.password?.message}
      />
      <button
        type="submit"
        className={styles.formBtn}
        disabled={!!errors.password || !!errors.email}
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
