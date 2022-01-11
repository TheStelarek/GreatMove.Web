import { MenuItem } from '@/components/core/navbar/NavbarTypes';

export const MYPROFILE: MenuItem = {
   page: {
      label: `My profile`,
      route: `/my-profile`,
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
         description: `Analyze your data to make more optimized plans`,
      },
      {
         label: `Create recipe`,
         route: `create-recipe`,
         description: `Analyze your data to make more optimized plans`,
      },
      {
         label: `My recipes`,
         route: `my-recipes`,
         description: `Analyze your data to make more optimized plans`,
      },
   ],
};

export const CALCULATORS: MenuItem = {
   page: {
      label: `Calculators`,
      route: `/calculators`,
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
         description: `Analyze your data to make more optimized plans`,
      },
      {
         label: `Plans`,
         route: `plans`,
         description: `Analyze your data to make more optimized plans`,
      },
      {
         label: `Exercises`,
         route: `exercises`,
         description: `Analyze your data to make more optimized plans`,
      },
   ],
};
