import styles from '@/features/auth/containers/registerContainer/RegisterContainer.module.scss';
import Divider from '@/components/core/divider/Divider';
import RegisterHeader from '@/features/auth/components/register/registerHeader/RegisterHeader';
import RegisterSocials from '@/features/auth/components/register/registerSocials/RegisterSocials';
import RegisterSignIn from '@/features/auth/components/register/registerSignIn/RegisterSignIn';
import RegisterLogo from '@/features/auth/components/register/registerLogo/RegisterLogo';
import RegisterBenefitBox from '@/features/auth/components/register/registerBenefitBox/RegisterBenefitBox';
import RegisterForm from '@/features/auth/components/register/registerForm/RegisterForm';
import Weight from '@/public/icons/weight.svg';
import Diet from '@/public/icons/diet.svg';
import Workout from '@/public/icons/workout.svg';

const RegisterContainer = () => (
   <div className={styles.container}>
      <div className={styles.information}>
         <RegisterLogo />
         <div className={styles.benefits}>
            <RegisterBenefitBox
               title="Save and track your trainings"
               description="By analyzing your workouts you will ensure continuous development."
            >
               <Weight className={styles.icon} />
            </RegisterBenefitBox>
            <RegisterBenefitBox
               title="Save and share your recipes"
               description="Enjoy creating your own recipes or using recipes prepared by our experts."
            >
               <Diet className={styles.icon} />
            </RegisterBenefitBox>
            <RegisterBenefitBox
               title="Create your own specialized training plans"
               description="Grow by creating your best workout plans in our app and share them with others!"
            >
               <Workout className={styles.icon} />
            </RegisterBenefitBox>
         </div>
      </div>

      <div className={styles.register}>
         <RegisterSignIn />
         <div className={styles.wrapper}>
            <RegisterHeader />
            <RegisterSocials />
            <Divider text="or" />
            <RegisterForm />
         </div>
      </div>
   </div>
);

export default RegisterContainer;
