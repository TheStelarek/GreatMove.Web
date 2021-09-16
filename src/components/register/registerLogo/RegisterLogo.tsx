import styles from '@/components/register/registerLogo/RegisterLogo.module.scss';
import Link from 'next/link';

const RegisterLogo = () => (
  <>
    <h2 className={styles.logo}>
      <Link href="/">GreatMove</Link>
    </h2>
    <p className={styles.description}>
      Just a few clicks away from the super functionalites of our application.
    </p>
  </>
);

export default RegisterLogo;