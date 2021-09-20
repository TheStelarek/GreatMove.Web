import Google from '@/public/logos/google.svg';
import Facebook from '@/public/logos/facebook.svg';
import styles from '@/components/login/loginSocials/LoginSocials.module.scss';

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
