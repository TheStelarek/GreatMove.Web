import Link from 'next/link';
import Logo from '@/components/core/logo/Logo';
import styles from '@/features/auth/components/register/registerLogo/RegisterLogo.module.scss';

const RegisterLogo = () => (
   <>
      <Link href="/">
         <button type="button" className={styles.logoWrapper}>
            <Logo variant="text" color="white" />
         </button>
      </Link>
      <p className={styles.description}>Just a few clicks away from the super functionalites of our application.</p>
   </>
);

export default RegisterLogo;
