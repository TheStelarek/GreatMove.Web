import styles from '@/components/core/input/Input.module.scss';
import cx from 'classnames';
import { forwardRef } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type InputProps = UseFormRegisterReturn & {
  label: string;
  placeholder?: string;
  type: 'text' | 'email' | 'number' | 'password';
  error?: string | null;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, placeholder, type, error, onChange, onBlur }, ref) => (
    <label htmlFor={name} className={styles.label}>
      {label && label}
      <input
        className={cx(styles.input, error && styles.inputError)}
        aria-invalid={error ? `true` : `false`}
        id={name}
        ref={ref}
        {...{ onChange, onBlur, name, placeholder, type }}
      />
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </label>
  ),
);

Input.displayName = `Input`;
export default Input;
