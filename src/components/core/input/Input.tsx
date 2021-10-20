import cx from 'classnames';
import { forwardRef, KeyboardEventHandler } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from '@/components/core/input/Input.module.scss';

type InputProps = UseFormRegisterReturn & {
  label?: string;
  placeholder?: string;
  error?: string | null;
  type: 'text' | 'email' | 'number' | 'password';
  radius?: 5 | 10 | 15;
  variant?: 'gray' | 'blue';
  size?: 'small' | 'regular' | 'big' | 'large';
  autocomplete?: boolean;
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
        {...{ onChange, onBlur, name, placeholder, type }}
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
