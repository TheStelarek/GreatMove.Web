import styles from '@/components/register/registerBenefitBox/RegisterBenefitBox.module.scss';

interface RegisterBenefitBoxProps {
  title: string;
  description: string;
}

const RegisterBenefitBox: React.FC<RegisterBenefitBoxProps> = ({
  children,
  title,
  description,
}) => (
  <div className={styles.benefitBox}>
    {children}
    <p className={styles.title}>{title}</p>
    <p className={styles.benefitDescription}>{description}</p>
  </div>
);

export default RegisterBenefitBox;
