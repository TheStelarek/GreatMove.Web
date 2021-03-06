import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { authSelector, clearState } from '@/features/auth/store/AuthSlice';
import { signUpUser } from '@/features/auth/store/signUpUser';
import { isAvailableEmailUsername } from '@/features/auth/store/isAvailableEmailUsername';
import styles from '@/features/auth/components/register/registerForm/RegisterForm.module.scss';
import Input from '@/components/core/input/Input';
import Button from '@/components/core/button/Button';
import {
   IsAvailableFunction,
   RegisterFormValue,
   RegisterStepOptions,
   RegisterValidationSchema,
} from '@/features/auth/components/register/registerForm/RegisterFormTypes';
import MailSent from '@/public/illustrations/mail-sent.svg';

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

   const onSubmit = (data: RegisterFormValue) => dispatch(signUpUser({ ...data }));

   const isValidAndAvailable: IsAvailableFunction = async (name, nextStep) => {
      const valid = await trigger(name, { shouldFocus: true });
      if (!valid) return false;

      const value = getValues(name);

      const available = await dispatch(isAvailableEmailUsername({ [name]: value }));
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
                  size="big"
                  {...register(`email`)}
                  error={errors?.email?.message || errorMessage}
               />
               <Button
                  size="large"
                  isBold
                  isFullWidth
                  isDisabled={!!errors.email}
                  isLoading={isFetching}
                  onClick={goToTheNextStep}
               >
                  Next
               </Button>
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
                  size="big"
                  {...register(`username`)}
                  error={errors?.username?.message || errorMessage}
               />
               <Button
                  size="large"
                  isBold
                  isFullWidth
                  isDisabled={!!errors.username}
                  isLoading={isFetching}
                  onClick={goToTheNextStep}
               >
                  Next
               </Button>
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
                     size="big"
                     {...register(`password`)}
                     error={errors?.password?.message || errorMessage}
                  />
                  <Button
                     type="submit"
                     size="large"
                     isBold
                     isFullWidth
                     isDisabled={!!errors.password || isSuccess}
                     isLoading={isFetching}
                  >
                     Submit
                  </Button>
               </>
            ))}
      </form>
   );
};

export default RegisterForm;
