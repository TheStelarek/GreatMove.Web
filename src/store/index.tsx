import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from '@/features/auth/store/AuthSlice';
import { recipesSlice } from '@/features/recipe/store/RecipesSlice';
import { shoppingListSlice } from '@/features/shoppingList/store/ShoppingListSlice';
import { api } from '@/store/api/api';
import { trainingPlanSlice } from '@/features/trainingPlan/store/TrainingPlanSlice';

const reducers = combineReducers({
   auth: authSlice.reducer,
   recipes: recipesSlice.reducer,
   shoppingList: shoppingListSlice.reducer,
   trainingPlan: trainingPlanSlice.reducer,
   [api.reducerPath]: api.reducer,
});

const persistConfig = {
   key: `root`,
   version: 1,
   storage,
   blacklist: [`recipes`, api.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }).concat(api.middleware),
});

export const persistor = persistStore(store);
