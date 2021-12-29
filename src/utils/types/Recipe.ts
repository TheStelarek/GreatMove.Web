import { CookStep } from '@/utils/types/CookStep';
import { Ingredient } from '@/utils/types/Ingredient';

export interface Recipe {
   id: string;
   name: string;
   preparationTime: number;
   cookTime?: number;
   description: string;
   tips?: string;
   calories: number;
   proteins: number;
   carbs: number;
   fats: number;
   fibre?: number;
   useConsent: boolean;
   visibility: string;
   diet?: string;
   meal: string;
   difficulty: string;
   steps: CookStep[];
   ingredients: Ingredient[];
   userId: string;
   pictureUrl: string;
   createdAt: Date;
   updatedAt: Date;
}
