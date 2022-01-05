import { CookStep } from '@/utils/types/CookStep';
import { Ingredient } from '@/utils/types/Ingredient';
import { Tag } from '@/utils/types/Tag';
import { Review } from '@/utils/types/Review';
import { Rating } from '@/utils/types/Rating';

export interface Recipe {
   id: string;
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
   createdAt: Date;
   updatedAt: Date;
}
