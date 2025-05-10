import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from './slices/films-slice';
import filtersReducer from './slices/filters-slice';

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
