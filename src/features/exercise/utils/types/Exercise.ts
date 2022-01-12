import { Type } from '@/features/exercise/utils/types/Type';

export type Exercise = {
   id: string;
   name: string;
   type?: Type;
};
