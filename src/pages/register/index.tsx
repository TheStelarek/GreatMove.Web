import styles from '@/styles/Register.module.scss';
import RegisterHeader from '@/components/register/registerHeader/RegisterHeader';
import RegisterSocials from '@/components/register/registerSocials/RegisterSocials';
import Divider from '@/components/core/divider/Divider';
import RegisterSignIn from '@/components/register/registerSignIn/RegisterSignIn';
import RegisterLogo from '@/components/register/registerLogo/RegisterLogo';
import Weight from '@/public/benefits/weight.svg';
import Diet from '@/public/benefits/diet.svg';
import Body from '@/public/benefits/body.svg';
import RegisterBenefitBox from '@/components/register/registerBenefitBox/RegisterBenefitBox';
import RegisterForm from '@/components/register/registerForm/RegisterForm';

export default function Register() {
  return (
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
            title="Plan and save your meals"
            description="Achieve your fitness goals with calorie counting."
          >
            <Diet className={styles.icon} />
          </RegisterBenefitBox>
          <RegisterBenefitBox
            title="Track your body measurements"
            description="Analyze your progress by tracking your measurements."
          >
            <Body className={styles.icon} />
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
}
