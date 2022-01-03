import { NestedValue } from 'react-hook-form';
import { Diet } from '@/utils/types/Diet';
import { Difficulty } from '@/utils/types/Difficulty';
import { Meal } from '@/utils/types/Meal';
import { OptionType } from '@/utils/types/OptionType';

export interface RecipeFormValues {
   title: string;
   preparationTime: number;
   cookTime?: number;
   description: string;
   tips?: string;
   calories: number;
   proteins: number;
   carbs: number;
   fats: number;
   fibre?: number;
   difficulty: Difficulty;
   meal: Meal;
   diet?: Diet;
   steps: { step: string }[];
   ingredients: {
      name?: string;
      weight?: number;
   }[];
   tags: string[];
   picture: FileList;
   useConsent: boolean;
   visibility: NestedValue<OptionType>;
}
