import cx from 'classnames';
import { forwardRef, KeyboardEventHandler } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from '@/components/core/input/Input.module.scss';

type InputProps = UseFormRegisterReturn & {
  type: 'text' | 'email' | 'number' | 'password';
  radius?: 5 | 10 | 15;
  variant?: 'gray' | 'blue';
  size?: 'small' | 'regular' | 'big' | 'large';
  label?: string;
  placeholder?: string;
  error?: string | null;
  autocomplete?: boolean;
  min?: number;
  max?: number;
  maxlength?: number;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement> | undefined;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      placeholder,
      type,
      error,
      radius,
      variant = `gray`,
      size = `regular`,
      onChange,
      onBlur,
      onKeyPress,
      min,
      max,
      maxlength,
      autocomplete = true,
    },
    ref,
  ) => (
    <label htmlFor={name} className={styles.label}>
      {label && label}
      <input
        className={cx(
          styles.input,
          styles[`input-${variant}`],
          styles[`input-radius-${radius}`],
          styles[`input-${size}`],
          error && styles.inputError,
        )}
        aria-invalid={error ? `true` : `false`}
        id={name}
        ref={ref}
        onKeyPress={onKeyPress}
        autoComplete={autocomplete ? `on` : `off`}
        {...{ onChange, onBlur, name, placeholder, type, min, max, maxlength }}
      />
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
    </label>
  ),
);

Input.displayName = `Input`;
export default Input;
