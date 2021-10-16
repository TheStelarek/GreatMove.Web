import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { authSelector, clearState } from '@/store/auth/AuthSlice';
import { signUpUser } from '@/store/auth/signUpUser';
import { isAvailableEmailUsername } from '@/store/auth/isAvailableEmailUsername';
import Input from '@/components/core/input/Input';
import styles from '@/components/register/registerForm/RegisterForm.module.scss';
import Spinner from '@/components/core/spinner/Spinner';
import MailSent from '@/public/mail-sent.svg';
import {
  IsAvailableFunction,
  RegisterFormValue,
  RegisterStepOptions,
  RegisterValidationSchema,
} from './RegisterFormTypes';

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const { isFetching, isSuccess, errorMessage } = useAppSelector(authSelector);
  const [step, setStep] = useState<number>(1);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValue>({
    mode: `onChange`,
    resolver: yupResolver(RegisterValidationSchema),
  });

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
  }, [errors.email, errors.username]);

  const onSubmit = (data: RegisterFormValue) =>
    dispatch(signUpUser({ ...data }));

  const isValidAndAvailable: IsAvailableFunction = async (name, nextStep) => {
    const valid = await trigger(name, { shouldFocus: true });
    if (!valid) return false;

    const value = getValues(name);

    const available = await dispatch(
      isAvailableEmailUsername({ [name]: value }),
    );
    if (isAvailableEmailUsername.rejected.match(available)) return false;

    dispatch(clearState());
    setStep(nextStep);
    return true;
  };

  const goToTheNextStep = () => {
    const steps: RegisterStepOptions = {
      '1': () => isValidAndAvailable(`email`, 2),
      '2': () => isValidAndAvailable(`username`, 3),
    };
    return steps[step]();
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && (
        <>
          <Input
            variant="blue"
            radius={15}
            label="Email"
            type="text"
            placeholder="Email address"
            {...register(`email`)}
            error={errors?.email?.message || errorMessage}
          />
          <button
            type="button"
            className={styles.formBtn}
            disabled={!!errors.email}
            onClick={goToTheNextStep}
          >
            {isFetching ? <Spinner /> : `Next`}
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <Input
            variant="blue"
            radius={15}
            label="Username"
            type="text"
            placeholder="Your username"
            {...register(`username`)}
            error={errors?.username?.message || errorMessage}
          />
          <button
            type="button"
            className={styles.formBtn}
            disabled={!!errors.username}
            onClick={goToTheNextStep}
          >
            {isFetching ? <Spinner /> : `Next`}
          </button>
        </>
      )}
      {step === 3 &&
        (isSuccess ? (
          <>
            <MailSent className={styles.mail} />
            <p role="alert" className="success">
              We just sent you confirmation link on email. Click on it!
            </p>
          </>
        ) : (
          <>
            <Input
              variant="blue"
              radius={15}
              label="Password"
              type="password"
              placeholder="Enter password"
              {...register(`password`)}
              error={errors?.password?.message || errorMessage}
            />
            <button
              type="submit"
              className={styles.formBtn}
              disabled={!!errors.password || isSuccess}
            >
              {isFetching ? <Spinner /> : `Submit`}
            </button>
          </>
        ))}
    </form>
  );
};

export default RegisterForm;
