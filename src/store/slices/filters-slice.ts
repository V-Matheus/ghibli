import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  isWatched: boolean | null;
  isFavorite: boolean | null;
  withNotes: boolean | null;
  minStars: string | null;
}

const initialState: FiltersState = {
  isWatched: null,
  isFavorite: null,
  withNotes: null,
  minStars: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setWatchedFilter(state, action: PayloadAction<boolean | null>) {
      state.isWatched = action.payload;
    },
    setFavoriteFilter(state, action: PayloadAction<boolean | null>) {
      state.isFavorite = action.payload;
    },
    setWithNotesFilter(state, action: PayloadAction<boolean | null>) {
      state.withNotes = action.payload;
    },
    setMinStarsFilter(state, action: PayloadAction<string | null>) {
      state.minStars = action.payload;
    },
    resetFilters(state) {
      state.isWatched = null;
      state.isFavorite = null;
      state.withNotes = null;
      state.minStars = null;
    },
  },
});

export const {
  setWatchedFilter,
  setFavoriteFilter,
  setWithNotesFilter,
  setMinStarsFilter,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
