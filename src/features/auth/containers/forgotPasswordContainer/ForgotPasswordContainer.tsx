import Link from 'next/link';
import Logo from '@/components/core/logo/Logo';
import styles from '@/features/auth/containers/forgotPasswordContainer/ForgotPasswordContainer.module.scss';
import ForgotPasswordForm from '@/features/auth/components/forgotPasswordForm/ForgotPasswordForm';

const ForgotPasswordContainer = () => (
   <div className={styles.container}>
      <div className={styles.box}>
         <Link href="/">
            <button type="button" className={styles.logoWrapper}>
               <Logo variant="text" color="blue" />
            </button>
         </Link>
         <h6 className={styles.heading}>Recover password</h6>

         <ForgotPasswordForm />
         <p className={styles.link}>
            <Link href="/login">Back to login</Link>
         </p>
      </div>
   </div>
);

export default ForgotPasswordContainer;
