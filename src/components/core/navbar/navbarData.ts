import { MenuItem } from '@/components/core/navbar/NavbarTypes';

export const MYPROFILE: MenuItem = {
   page: {
      label: `Profile`,
      route: `/settings`,
   },
};

export const LOGIN: MenuItem = {
   page: {
      label: `LOGIN`,
      route: `/login`,
   },
};
export const REGISTER: MenuItem = {
   page: {
      label: `REGISTER`,
      route: `/register`,
   },
};

export const RECIPES: MenuItem = {
   page: {
      label: `Recipes`,
      route: `/recipes`,
   },
   nested: [
      {
         label: `Recipes`,
         route: ``,
         description: `Search among the best recipes in our website`,
      },
      {
         label: `Create recipe`,
         route: `create-recipe`,
         description: `Make your own recipe and share with others!`,
      },
      {
         label: `My recipes`,
         route: `my-recipes`,
         description: `A cookbook with recipes you've created`,
      },
   ],
};

export const CALCULATORS: MenuItem = {
   page: {
      label: `Calculators`,
      route: `/calculators`,
   },
};

export const SHOPPINGLIST: MenuItem = {
   page: {
      label: `Shopping list`,
      route: `/my-shopping-list`,
   },
};

export const TRAININGS: MenuItem = {
   page: {
      label: `Trainings`,
      route: `/trainings`,
   },
   nested: [
      {
         label: `Create plan`,
         route: `create-training-plan`,
         description: `Make your own specializied workout plan`,
      },
      {
         label: `Plans`,
         route: `plans`,
         description: `Your list of training plans you've created`,
      },
      {
         label: `Exercises`,
         route: `exercises`,
         description: `Your exercise database`,
      },
   ],
};
