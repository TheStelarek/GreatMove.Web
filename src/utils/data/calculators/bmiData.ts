import { CalculatorType } from '@/utils/types/Calculator';

export const bmiData: CalculatorType = {
  name: `BMI Calculator`,
  description: `Body mass index (BMI) is a measurement of a person's leanness or corpulence based on their height and weight, and is intended to quantify tissue mass. It is widely used as a general indicator of whether a person has a healthy body weight for their height. Specifically, the value obtained from the calculation of BMI is used to categorize whether a person is underweight, normal weight, overweight, or obese depending on what range the value falls between. These ranges of BMI vary based on factors such as region and age, and are sometimes further divided into subcategories such as severely underweight or very severely obese. Being overweight or underweight can have significant health effects, so while BMI is an imperfect measure of healthy body weight, it is a useful indicator of whether any additional testing or action is required.`,
};

export const bmiRanges = [
  {
    range: `< 16`,
    category: `Severe Thinness`,
  },
  {
    range: `16.0 - 16.99`,
    category: `Moderate Thinness`,
  },
  {
    range: `17.0 - 18.49`,
    category: `Mild Thinness`,
  },
  {
    range: `18.5 - 24.99`,
    category: `Normal`,
  },
  {
    range: `25.0 - 29.99`,
    category: `Overweight`,
  },
  {
    range: `30.0 - 34.99`,
    category: `Obese Class I`,
  },
  {
    range: `35.0 - 39.99`,
    category: `Obese Class II`,
  },
  {
    range: `≥ 40`,
    category: `Obese Class III`,
  },
];
