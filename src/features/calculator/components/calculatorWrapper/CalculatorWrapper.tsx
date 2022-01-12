import styles from '@/features/calculator/components/calculatorWrapper/CalculatorWrapper.module.scss';
import { Calculator } from '@/features/calculator/utils/types/Calculator';

const CalculatorWrapper: React.FC<Calculator> = ({ name, description, children }) => (
   <div className={styles.calculatorContainer}>
      <h1 className={styles.heading}>{name}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.content}>{children}</div>
   </div>
);

export default CalculatorWrapper;
