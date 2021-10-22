import { CalculatorType } from '@/utils/types/Calculator';

export const calculatorsData: CalculatorType[] = [
  {
    name: `Smolov jr.`,
    description: `Take this challenge and use 4 weeks long smolov junior plan`,
  },
  {
    name: `Wendler 5/3/1`,
    description: `Most basic version of 5/3/1`,
  },
  {
    name: `BMI`,
    description: `Calculate your BMI`,
  },
  {
    name: `1 REP MAX`,
    description: `Estimate your 1 rep max`,
  },
  {
    name: `BMR`,
    description: `Calculate your basal metabolic rate`,
  },
  {
    name: `TBR`,
    description: `Calculate your total metabolic rate`,
  },
];

export const oneRepMaxData: CalculatorType = {
  name: `1 Rep Max Calculator`,
  description: `Calculate your one-rep max (1RM) for any lift. Your one-rep max is the max weight you can lift for a single repetition for a given exercise. Keep in mind that the calculator is only predicting what your max may be. The result may differ from reality to a large extent. The best results are for a number of repetitions between two and five.`,
};
