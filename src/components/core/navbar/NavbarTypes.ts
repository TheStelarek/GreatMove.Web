export interface PageRoute {
  label: string;
  route: string;
  description?: string;
}

export interface MenuItem {
  page: PageRoute;
  nested?: PageRoute[];
}

export enum NestedMenuTypes {
  trainings,
}

export type NavbarVariants = 'purple';
