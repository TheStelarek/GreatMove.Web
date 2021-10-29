import styles from '@/components/calculator/Calculator.module.scss';
import { CalculatorType } from '@/utils/types/Calculator';

const Calculator: React.FC<CalculatorType> = ({ name, description, children }) => (
   <div className={styles.calculatorContainer}>
      <h1 className={styles.heading}>{name}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.content}>{children}</div>
   </div>
);

export default Calculator;
