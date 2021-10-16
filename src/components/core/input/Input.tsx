import cx from 'classnames';
import { forwardRef, KeyboardEventHandler } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from '@/components/core/input/Input.module.scss';

type InputProps = UseFormRegisterReturn & {
  label?: string;
  placeholder?: string;
  type: 'text' | 'email' | 'number' | 'password';
  error?: string | null;
  radius?: 5 | 10 | 15;
  variant?: 'gray' | 'blue';
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
