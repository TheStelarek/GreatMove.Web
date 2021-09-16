import styles from '@/components/core/divider/Divider.module.scss';

interface DividerProps {
  text?: string;
}

const Divider: React.FC<DividerProps> = ({ text }) =>
  text ? (
    <span className={styles.dividerText}>{text}</span>
  ) : (
    <span className={styles.divider} />
  );

export default Divider;
