import Link from 'next/link';
import styles from '@/components/register/registerLogo/RegisterLogo.module.scss';
import Logo from '@/public/logo/greatmove-white.svg';

const RegisterLogo = () => (
  <>
    <Link href="/">
      <Logo className={styles.logo} />
    </Link>
    <p className={styles.description}>
      Just a few clicks away from the super functionalites of our application.
    </p>
  </>
);

export default RegisterLogo;
