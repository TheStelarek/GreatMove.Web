import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from '@/store/auth/AuthSlice';
import { recipesSlice } from '@/store/recipes/RecipesSlice';
import { shoppingListSlice } from '@/store/shoppingList/ShoppingListSlice';
import { trainingPlanSlice } from './trainingPlan/TrainingPlanSlice';

const reducers = combineReducers({
   auth: authSlice.reducer,
   recipes: recipesSlice.reducer,
   shoppingList: shoppingListSlice.reducer,
   trainingPlan: trainingPlanSlice.reducer,
});

const persistConfig = {
   key: `root`,
   version: 1,
   storage,
   blacklist: [`recipes`],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
});

export const persistor = persistStore(store);
