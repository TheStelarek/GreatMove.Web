import styles from '@/styles/Register.module.scss';
import Google from '@/public/logos/google.svg';
import Facebook from '@/public/logos/facebook.svg';

export default function Register() {
  return (
    <div className={styles.container}>
      <div className={styles.information} />
      <div className={styles.register}>
        <div className={styles.signIn}>
          Already have an account?
          <button type="button">Sign in</button>
        </div>
        <h1 className={styles.heading}>Create your free account</h1>
        <div className={styles.socials}>
          <button type="button" className={styles.social}>
            <Google className={styles.icon} /> Sign up with Google
          </button>
          <button type="button" className={styles.social}>
            <Facebook className={styles.icon} /> Sign up with Facebook
          </button>
        </div>
        <span className={styles.divider}>or</span>
        <form action="" className={styles.registerForm}>
          <div className={styles.inputWrapper}>
            <label htmlFor="email" className={styles.label}>
              Email
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                className={styles.input}
              />
            </label>
          </div>
          <button type="button" className={styles.formBtn}>
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
