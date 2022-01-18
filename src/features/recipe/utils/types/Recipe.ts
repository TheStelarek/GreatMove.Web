import { CookStep } from '@/features/recipe/utils/types/CookStep';
import { Ingredient } from '@/features/recipe/utils/types/Ingredient';
import { Tag } from '@/features/recipe/utils/types/Tag';
import { Review } from '@/features/recipe/utils/types/Review';
import { Rating } from '@/utils/types/Rating';

export interface Recipe {
   id: string;
   number?: number;
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
   useConsent: boolean;
   visibility: string;
   diet?: string;
   meal: string;
   difficulty: string;
   steps: CookStep[];
   tags: Tag[];
   ingredients: Ingredient[];
   reviews: Review[];
   groupedRating: Rating;
   userId: string;
   pictureUrl: string;
   createdAt: Date | string | null;
   updatedAt: Date;
}
