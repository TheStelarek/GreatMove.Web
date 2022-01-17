import { Calculator } from '@/features/calculator/utils/types/Calculator';

export const tmrData: Calculator = {
   name: `TMR Calculator`,
   description: `The BMR plus the additional energy expenditure for movement and other activities equals the total metabolic rate (TMR). Physical activity, as well as food, anxiety, fever, pregnancy, and other conditions, raise metabolic rate. Children have a higher TMR than adults. As a result, as people reach middle age, they frequently acquire weight despite without changing their eating habits. Weight-loss diets are discouraging not just because much of the initial weight loss is water, which is rapidly regained, but also because the TMR decreases over time; as the diet progresses, less calories are burned, and even with a consistent caloric intake, one begins to synthesize more fat.`,
};

export const physicalActivities = [
   {
      description: `Lying lifestyle, no physical activity, everyday housekeeping, no walking, a major portion of the day spent in bed, and patients who are frequently hospitalized`,
      category: 1,
   },
   {
      description: `Sedentary lifestyle, everyday chores, sedentary employment, short walks less than 30 minutes, lack of exercise consistency`,
      category: 2,
   },
   {
      description: `Sedentary job, everyday chores, 40-60 minutes of moderate physical exercise are examples of moderate physical activity (e.g. walking the dog, training at home, training with rubber bands, jogging). If you work out at home or at the gym on a regular basis, this ratio is ideal for you. This is, for example, my physical activity`,
      category: 3,
   },
   {
      description: `Physical activity that is above average: daily chores, physical exercise 3-6 times a week for 60 minutes each (e.g. running, weight training, home workout, cycling, tennis, dance), or physical work. For those who lift heavier weights, this is a must`,
      category: 4,
   },
   {
      description: `Daily housework, highly frequent physical work, and 60 minutes of moderate physical activity per day are all examples of high physical activity (e.g. running, weight training, swimming, cycling, playing tennis, dancing to a rather advanced degree). This is, for example, Peter's activity when he is preparing for a competition`,
      category: 5,
   },
   {
      description: `Very high physical activity: daily housework + physically hard work (e.g. mine work) + more than 60 minutes of daily intensive physical exercise (e.g. gym training) - PAL can sometimes approach 2.4 in this instance.`,
      category: 6,
   },
];
