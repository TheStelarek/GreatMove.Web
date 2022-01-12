import { Calculator } from '@/features/calculator/utils/types/Calculator';

export const tmrData: Calculator = {
   name: `TMR Calculator`,
   description: `Total metabolic rate (TMR) is the BMR plus the added energy expenditure for movement and other activities. Metabolic rate is elevated not only by physical activity but also by eating, anxiety, fever, pregnancy, and other factors. The TMR is higher in children than in adults. Consequently, as people approach middle age, they often gain weight even with no change in food intake. Weight-loss diets tend to be frustrating not only because most of the initial weight loss is water, which is quickly regained, but also because the TMR declines with time; as the diet progresses, fewer calories are burned and one begins to synthesize more fat even with a stable caloric intake.`,
};

export const physicalActivities = [
   {
      description: `Lying lifestyle, no physical activity, daily housework, no walking, large part of the day spent in bed, very often hospitalized patients`,
      category: 1,
   },
   {
      description: `Sedentary lifestyle, daily housework, sedentary job, walks less than 30 minutes, no regularity of exercise`,
      category: 2,
   },
   {
      description: `Moderate physical activity: sedentary job, daily housework, 40-60 minutes of moderate physical activity (e.g. walking the dog, training at home, training with rubber bands, jogging). If you regularly workout at home or at the gym then this ratio will definitely be for you. For example, this is my physical activity.`,
      category: 3,
   },
   {
      description: `Above average physical activity: daily housework, physical activity several times a week about 3-6 at 60 minutes each to a more advanced degree (e.g. running, weight training, home workout, cycling, tennis, dancing) or physical work. Definitely for people who lift heavier weights. `,
      category: 4,
   },
   {
      description: `High physical activity: Daily housework, very frequent physical work, 60 minutes of daily moderate physical activity (e.g. running, weight training, swimming, cycling, playing tennis, dancing to a rather advanced degree). For example, this is Peter's activity while preparing for a competition.`,
      category: 5,
   },
   {
      description: `Very high physical activity: daily housework + very demanding physical work (e.g. work in a mine) + more than 60 minutes of daily intensive physical activity (e.g. training in a gym) - sometimes in such a case PAL reaches the value of 2.4.`,
      category: 6,
   },
];
