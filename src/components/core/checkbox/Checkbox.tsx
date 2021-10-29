import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import cx from 'classnames';
import styles from '@/components/core/checkbox/Checkbox.module.scss';

type CheckboxProps = UseFormRegisterReturn & {
   label: string;
   value: string | number;
   variant?: 'primary' | 'secondary';
   fontVariant?: 'p1' | 'p2' | 'p3';
   fontWeight?: 'regular' | 'semi-bold' | 'bold';
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
   (
      { label, value, variant = `primary`, fontVariant = `p2`, fontWeight = `semi-bold`, onChange, onBlur, name },
      ref,
   ) => (
      <div className={styles.checkboxWrapper}>
         <input
            className={styles.checkbox}
            value={value}
            id={value.toString()}
            type="checkbox"
            ref={ref}
            {...{ onChange, onBlur, name }}
         />
         <label
            htmlFor={value.toString()}
            className={cx(
               styles.label,
               styles[`label-${variant}`],
               styles[`label-${fontVariant}`],
               styles[`label-${fontWeight}`],
            )}
         >
            {label}
         </label>
      </div>
   ),
);

Checkbox.displayName = `Checkbox`;
export default Checkbox;
