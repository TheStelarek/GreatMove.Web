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
      label: `Start training`,
      route: `start-training`,
      description: `Analyze your data to make more optimized plans`,
    },
    {
      label: `History`,
      route: `history`,
      description: `Analyze your data to make more optimized plans`,
    },
    {
      label: `Create plan`,
      route: `create-plan`,
      description: `Analyze your data to make more optimized plans`,
    },
    {
      label: `Plans`,
      route: `plans`,
      description: `Analyze your data to make more optimized plans`,
    },
  ],
};

export const BLOG: MenuItem = {
  page: {
    label: `Blog`,
    route: `/blog`,
  },
};
