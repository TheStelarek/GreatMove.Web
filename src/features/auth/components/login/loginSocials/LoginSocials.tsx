import styles from '@/features/auth/components/login/loginSocials/LoginSocials.module.scss';
import Google from '@/public/icons/google.svg';
import Facebook from '@/public/icons/facebook.svg';

const LoginSocials = () => (
   <div className={styles.socials}>
      <button type="button" className={styles.social}>
         <Google className={styles.icon} /> Continue with Google
      </button>
      <button type="button" className={styles.social}>
         <Facebook className={styles.icon} /> Continue with Facebook
      </button>
   </div>
);

export default LoginSocials;
