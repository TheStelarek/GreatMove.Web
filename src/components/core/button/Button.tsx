import cx from 'classnames';
import { ReactElement } from 'react';
import styles from '@/components/core/button/Button.module.scss';
import Spinner from '@/components/core/spinner/Spinner';

interface ButtonProps {
  onClick?: () => any;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  variant?: 'primary' | 'secondary' | 'ghost-primary' | 'ghost-secondary';
  size?: 'small' | 'regular' | 'large';
  type?: 'button' | 'submit' | 'reset';
  borderRadius?: 5 | 8 | 10 | 15;
  isDisabled?: boolean;
  isBold?: boolean;
  isFullWidth?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  leftIcon,
  rightIcon,
  variant = `primary`,
  size = `regular`,
  type = `button`,
  borderRadius,
  isDisabled,
  isBold,
  isFullWidth,
  isLoading,
  children,
}) => (
  <button
    type={`${type}`}
    onClick={onClick}
    disabled={isDisabled}
    className={cx(
      styles.button,
      isFullWidth && styles.buttonFullWidth,
      isBold && styles.bold,
      isLoading && styles.buttonLoading,
      styles[`button-${variant}`],
      styles[`button-${size}`],
      styles[`button-radius-${borderRadius}`],
    )}
  >
    {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
    <span>{children}</span>
    {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    {isLoading && !isDisabled && (
      <span className={styles.loading}>
        <Spinner size={size} variant={variant} />
      </span>
    )}
  </button>
);

export default Button;
