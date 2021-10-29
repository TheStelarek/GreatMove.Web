import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import cx from 'classnames';
import styles from '@/components/core/radio/Radio.module.scss';

type RadioProps = UseFormRegisterReturn & {
   label: string;
   value: string | number;
   variant?: 'primary' | 'secondary';
   fontVariant?: 'p1' | 'p2' | 'p3';
   fontWeight?: 'regular' | 'semi-bold' | 'bold';
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(
   (
      { label, value, variant = `primary`, fontVariant = `p2`, fontWeight = `semi-bold`, onChange, onBlur, name },
      ref,
   ) => (
      <div className={styles.radioWrapper}>
         <input
            className={styles.radio}
            value={value}
            id={value.toString()}
            type="radio"
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

Radio.displayName = `Radio`;
export default Radio;
