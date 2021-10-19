import Link from 'next/link';
import styles from '@/pages/login/Login.module.scss';
import LoginForm from '@/components/login/loginForm/LoginForm';
import LoginSocials from '@/components/login/loginSocials/LoginSocials';
import Divider from '@/components/core/divider/Divider';
import Logo from '@/components/core/logo/Logo';

export default function Login() {
  return (
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
}
