import Link from 'next/link';
import styles from '@/features/auth/containers/loginContainer/LoginContainer.module.scss';
import LoginForm from '@/features/auth/components/login/loginForm/LoginForm';
import LoginSocials from '@/features/auth/components/login/loginSocials/LoginSocials';
import Divider from '@/components/core/divider/Divider';
import Logo from '@/components/core/logo/Logo';

const LoginContainer = () => (
   <div className={styles.container}>
      <div className={styles.loginBox}>
         <Link href="/">
            <button type="button" className={styles.logoWrapper}>
               <Logo variant="text" color="blue" />
            </button>
         </Link>
         <h5 className={styles.login}>Sign in</h5>
         <LoginSocials />
         <Divider text="or" />
         <LoginForm />
         <div className={styles.links}>
            <p className={styles.link}>
               <Link href="/register">Don't have an account? Sign up!</Link>
            </p>
            <p className={styles.link}>
               <Link href="/">Forgot password?</Link>
            </p>
         </div>
      </div>
   </div>
);

export default LoginContainer;
