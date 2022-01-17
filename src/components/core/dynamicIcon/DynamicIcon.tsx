import TrainingsPlans from '@/public/navbar/trainings-plans.svg';
import TrainingsPlanning from '@/public/navbar/trainings-planning.svg';
import Exercises from '@/public/navbar/exercises.svg';
import Recipes from '@/public/navbar/recipes.svg';
import RecipeBook from '@/public/navbar/recipe-book.svg';
import CreateRecipe from '@/public/navbar/create-recipe.svg';

const icons = new Map([
   [`Plans`, TrainingsPlans],
   [`Create plan`, TrainingsPlanning],
   [`Exercises`, Exercises],
   [`Recipes`, Recipes],
   [`Create recipe`, CreateRecipe],
   [`My recipes`, RecipeBook],
]);

interface DynamicIconProps {
   name: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
   const Icon = icons.get(name);
   return <Icon {...props} />;
};

export default DynamicIcon;
