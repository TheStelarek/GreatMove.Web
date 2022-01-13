import cx from 'classnames';
import { forwardRef, KeyboardEventHandler } from 'react';
import { ChangeHandler, InternalFieldName, RefCallBack } from 'react-hook-form';
import styles from '@/components/core/textArea/TextArea.module.scss';

interface TextAreaStyles {
   radius?: 5 | 10 | 15;
   variant?: 'gray' | 'blue';
   size?: 'small' | 'regular' | 'big' | 'large' | 'full';
}

interface TextAreaHandlers {
   onKeyPress?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
   onChange?: ChangeHandler | ((e: React.ChangeEvent<HTMLTextAreaElement>) => void);
   onBlur?: ChangeHandler | (() => void);
   ref?: RefCallBack;
}
interface TextAreaAttributes {
   autocomplete?: boolean;
   name?: InternalFieldName | string;
   value?: string | number;
   placeholder?: string;
   autoFocus?: boolean;
}

type TextAreaProps = TextAreaStyles &
   TextAreaHandlers &
   TextAreaAttributes & {
      label?: string;
      error?: string | null;
   };

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
   (
      { radius, variant = `gray`, size = `regular`, label, error, onChange, onBlur, placeholder, autoFocus, name },
      ref,
   ) => (
      <label htmlFor={name} className={cx(styles.label, styles[`textArea-${size}`])}>
         {label && label}
         <textarea
            className={cx(
               styles.textArea,
               styles[`textArea-${variant}`],
               styles[`textArea-radius-${radius}`],

               error && styles.textAreaError,
            )}
            aria-invalid={error ? `true` : `false`}
            id={name}
            ref={ref}
            {...{ onChange, onBlur, name, placeholder, autoFocus }}
         />
         {error && (
            <p role="alert" className="error">
               {error}
            </p>
         )}
      </label>
   ),
);

TextArea.displayName = `TextArea`;
export default TextArea;
