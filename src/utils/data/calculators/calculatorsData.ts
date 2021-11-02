import { CalculatorType } from '@/utils/types/Calculator';

interface CalculatorData extends CalculatorType {
   href: string;
}

export const calculatorsData: CalculatorData[] = [
   {
      name: `Smolov jr.`,
      description: `Take this challenge and use 4 weeks long smolov junior plan`,
      href: `/smolov-jr-calculator`,
   },
   {
      name: `Wendler 5/3/1`,
      description: `Most basic version of 5/3/1`,
      href: `/`,
   },
   {
      name: `BMI`,
      description: `Calculate your BMI`,
      href: `/bmi-calculator`,
   },
   {
      name: `1 REP MAX`,
      description: `Estimate your 1 rep max`,
      href: `/one-rep-max-calculator`,
   },
   {
      name: `BMR`,
      description: `Calculate your basal metabolic rate`,
      href: `/`,
   },
   {
      name: `TMR`,
      description: `Calculate your total metabolic rate`,
      href: `/tmr-calculator`,
   },
];
