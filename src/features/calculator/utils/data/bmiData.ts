import { Calculator } from '@/features/calculator/utils/types/Calculator';

export const bmiData: Calculator = {
   name: `BMI Calculator`,
   description: `The body mass index (BMI) is a formula that calculates a person's leanness or corpulence depending on their height and weight. It is used to estimate tissue mass. It is commonly used as a general indicator of whether a person's body weight is appropriate for their height. Specifically, the BMI value is used to determine whether a person is underweight, normal weight, overweight, or obese, based on where the value falls within the range. These BMI levels vary by geography and age, and are frequently further subdivided into subcategories like severely underweight or very severely obese. Obesity or underweight can have serious health consequences.`,
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
