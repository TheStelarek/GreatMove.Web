import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/utils/types/RootState';
import { Ingredient } from '@/utils/types/Ingredient';

interface ShoppingListState {
   products: Array<Ingredient>;
}

const initialState: ShoppingListState = {
   products: [],
};

export const shoppingListSlice = createSlice({
   name: `shoppingList`,
   initialState,
   reducers: {
      clearState: (state) => {
         state.products = [];
      },
      deleteProduct: (state, action: PayloadAction<string>) => {
         state.products = state.products.filter(({ id }) => id !== action.payload);
      },
      addProduct: (state: ShoppingListState, action: PayloadAction<Array<Ingredient>>) => {
         if (!state.products.length) {
            state.products.push(...action.payload);
            return state;
         }

         const duplicateIndexes: Array<number> = [];
         const increasedWeightsProductsList = state.products.map(({ name, id, weight }: Ingredient) => {
            const index = action.payload.findIndex((ingredient: Ingredient) => ingredient.name === name);
            let newWeight = 0;

            if (index >= 0) {
               newWeight = weight + action.payload[index].weight;
               duplicateIndexes.push(index);
            } else {
               newWeight = weight;
            }

            return { id, name, weight: newWeight };
         });

         const newProducts = action.payload.filter((_, index) => !duplicateIndexes.includes(index));

         state.products = [...increasedWeightsProductsList, ...newProducts];
         return state;
      },
   },
});

export const { addProduct, clearState, deleteProduct } = shoppingListSlice.actions;
export const shoppingListSelector = (state: RootState) => state.shoppingList;
