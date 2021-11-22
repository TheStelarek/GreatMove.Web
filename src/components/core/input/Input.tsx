import cx from 'classnames';
import { forwardRef, KeyboardEventHandler } from 'react';
import { ChangeHandler, InternalFieldName, RefCallBack } from 'react-hook-form';
import styles from '@/components/core/input/Input.module.scss';

interface InputStyles {
   radius?: 5 | 10 | 15;
   variant?: 'gray' | 'blue';
   size?: 'small' | 'regular' | 'big' | 'large';
}

interface InputHandlers {
   onKeyPress?: KeyboardEventHandler<HTMLInputElement> | undefined;
   onChange?: ChangeHandler | ((e: React.ChangeEvent<HTMLInputElement>) => void);
   onBlur?: ChangeHandler | (() => void);
   ref?: RefCallBack;
}
interface InputAttributes {
   type?: 'text' | 'email' | 'number' | 'password';
   autocomplete?: boolean;
   min?: number;
   max?: number;
   maxLength?: number;
   name?: InternalFieldName | string;
   value?: string | number;
   placeholder?: string;
   autoFocus?: boolean;
}

type InputProps = InputStyles &
   InputHandlers &
   InputAttributes & {
      label?: string;
      error?: string | null;
   };

const Input = forwardRef<HTMLInputElement, InputProps>(
   (
      {
         radius,
         variant = `gray`,
         size = `regular`,
         label,
         error,
         onChange,
         onBlur,
         onKeyPress,
         placeholder,
         autoFocus,
         type = `text`,
         name,
         min,
         max,
         maxLength,
         autocomplete = true,
         value,
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
            value={value === 0 ? `` : value}
            {...{ onChange, onBlur, name, placeholder, type, min, max, maxLength, autoFocus }}
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
