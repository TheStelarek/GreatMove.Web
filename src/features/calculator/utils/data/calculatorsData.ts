import { Calculator } from '@/features/calculator/utils/types/Calculator';

interface CalculatorData extends Calculator {
   href: string;
}

export const calculatorsData: CalculatorData[] = [
   {
      name: `Smolov jr.`,
      description: `Take this challenge and use 4 weeks long smolov junior plan`,
      href: `smolov-jr-calculator`,
   },
   {
      name: `HOMA-IR`,
      description: `HOMA-IR - HOmeostatic Model Assessment for Insulin Resistance`,
      href: `homa-calculator`,
   },
   {
      name: `BMI`,
      description: `Calculate your BMI`,
      href: `bmi-calculator`,
   },
   {
      name: `1 REP MAX`,
      description: `Estimate your 1 rep max`,
      href: `one-rep-max-calculator`,
   },
   {
      name: `BMR`,
      description: `Calculate your basal metabolic rate`,
      href: `bmr-calculator`,
   },
   {
      name: `TMR`,
      description: `Calculate your total metabolic rate`,
      href: `tmr-calculator`,
   },
];
