import styles from '@/components/core/spinner/Spinner.module.scss';

const Spinner = () => (
  <div className={styles.skChase}>
    <div className={styles.skChaseDot} />
    <div className={styles.skChaseDot} />
    <div className={styles.skChaseDot} />
    <div className={styles.skChaseDot} />
    <div className={styles.skChaseDot} />
    <div className={styles.skChaseDot} />
  </div>
);

export default Spinner;
