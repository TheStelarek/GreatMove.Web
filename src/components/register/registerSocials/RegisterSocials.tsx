import Google from '@/public/logos/google.svg';
import Facebook from '@/public/logos/facebook.svg';
import styles from '@/components/register/registerSocials/RegisterSocials.module.scss';

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
