import Link from 'next/link';
import styles from '@/components/register/registerSignIn/RegisterSignIn.module.scss';

const RegisterSignIn = () => (
  <div className={styles.signIn}>
    Already have an account?
    <Link href="/login">
      <button type="button">Sign in</button>
    </Link>
  </div>
);

export default RegisterSignIn;
