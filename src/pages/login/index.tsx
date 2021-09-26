import Link from 'next/link';
import styles from '@/styles/Login.module.scss';
import LoginForm from '@/components/login/loginForm/LoginForm';
import LoginSocials from '@/components/login/loginSocials/LoginSocials';

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>GreatMove</div>
        <h3 className={styles.login}>Sign in</h3>
        <LoginSocials />
        <span className={styles.divider}>or</span>
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
