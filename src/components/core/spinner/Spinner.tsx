import cx from 'classnames';
import styles from '@/components/core/spinner/Spinner.module.scss';

interface SpinnerProps {
   variant?: 'primary' | 'secondary' | 'ghost-primary' | 'ghost-secondary' | 'warning';
   size?: 'small' | 'regular' | 'large' | 'extra-large';
}

const Spinner: React.FC<SpinnerProps> = ({ variant = `primary`, size = `regular` }) => (
   <div className={cx(styles.skChase, styles[`skChase-${size}`], styles[`skChase-${variant}`])}>
      <div className={cx(styles.skChaseDot, styles[`skChaseDot-${variant}`])} />
      <div className={cx(styles.skChaseDot, styles[`skChaseDot-${variant}`])} />
      <div className={cx(styles.skChaseDot, styles[`skChaseDot-${variant}`])} />
      <div className={cx(styles.skChaseDot, styles[`skChaseDot-${variant}`])} />
      <div className={cx(styles.skChaseDot, styles[`skChaseDot-${variant}`])} />
      <div className={cx(styles.skChaseDot, styles[`skChaseDot-${variant}`])} />
   </div>
);

export default Spinner;
