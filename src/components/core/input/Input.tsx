import styles from '@/components/core/input/Input.module.scss';

interface InputProps {
  labelText?: string;
  htmlFor: string;
  type: string;
  name: string;
  id: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  labelText,
  htmlFor,
  type,
  name,
  id,
  placeholder,
}) => (
  <label htmlFor={htmlFor} className={styles.label}>
    {labelText && labelText}
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={styles.input}
    />
  </label>
);

export default Input;
