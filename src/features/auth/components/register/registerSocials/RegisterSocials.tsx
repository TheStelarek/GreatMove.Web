import styles from '@/features/auth/components/register/registerSocials/RegisterSocials.module.scss';
import Google from '@/public/icons/google.svg';
import Facebook from '@/public/icons/facebook.svg';

const RegisterSocials = () => (
   <div className={styles.socials}>
      <button type="button" className={styles.social}>
         <Google className={styles.icon} /> Sign up with Google
      </button>
      <button type="button" className={styles.social}>
         <Facebook className={styles.icon} /> Sign up with Facebook
      </button>
   </div>
);

export default RegisterSocials;
