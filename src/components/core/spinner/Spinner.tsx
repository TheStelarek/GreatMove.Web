import styles from '@/components/core/spinner/Spinner.module.scss';

interface SpinnerProps {
  big?: boolean;
  blue?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ big, blue }) => (
  <div className={big ? styles.skChageBig : styles.skChase}>
    <div className={blue ? styles.skChaseDotBlue : styles.skChaseDot} />
    <div className={blue ? styles.skChaseDotBlue : styles.skChaseDot} />
    <div className={blue ? styles.skChaseDotBlue : styles.skChaseDot} />
    <div className={blue ? styles.skChaseDotBlue : styles.skChaseDot} />
    <div className={blue ? styles.skChaseDotBlue : styles.skChaseDot} />
    <div className={blue ? styles.skChaseDotBlue : styles.skChaseDot} />
  </div>
);

export default Spinner;
