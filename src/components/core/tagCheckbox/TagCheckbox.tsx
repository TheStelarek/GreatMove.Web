import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from '@/components/core/tagCheckbox/TagCheckbox.module.scss';

type TagCheckboxProps = UseFormRegisterReturn & {
  label: string;
  type: 'checkbox' | 'radio';
  value: string | number;
};

const TagCheckbox = forwardRef<HTMLInputElement, TagCheckboxProps>(
  ({ name, label, type, onChange, onBlur, value }, ref) => (
    <div className={styles.tagContainer}>
      <input
        value={value}
        id={value.toString()}
        ref={ref}
        {...{ onChange, onBlur, name, type }}
      />
      <label htmlFor={value.toString()} className={styles.label}>
        {label}
      </label>
    </div>
  ),
);

TagCheckbox.displayName = `TagCheckbox`;
export default TagCheckbox;
