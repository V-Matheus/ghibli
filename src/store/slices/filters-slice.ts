import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchFilter {
  query: string | null;
  includeSynopsis: boolean | null;
}

interface FiltersState {
  isWatched: boolean | null;
  isFavorite: boolean | null;
  withNotes: boolean | null;
  minStars: string | null;
  sortOrder: string | null;
  search: SearchFilter;
}

const initialState: FiltersState = {
  isWatched: null,
  isFavorite: null,
  withNotes: null,
  minStars: null,
  sortOrder: null,
  search: {
    query: null,
    includeSynopsis: false,
  },
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
    setSortOrder(state, action: PayloadAction<string | null>) {
      state.sortOrder = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.search.query = action.payload;
    },
    setIncludeSynopsis(state, action: PayloadAction<boolean>) {
      state.search.includeSynopsis = action.payload;
    },
    resetFilters(state) {
      state.isWatched = null;
      state.isFavorite = null;
      state.withNotes = null;
      state.minStars = null;
      state.sortOrder = null;
      state.search = {
        query: '',
        includeSynopsis: false,
      };
    },
  },
});

export const {
  setWatchedFilter,
  setFavoriteFilter,
  setWithNotesFilter,
  setMinStarsFilter,
  resetFilters,
  setSortOrder,
  setSearchQuery,
  setIncludeSynopsis,
} = filtersSlice.actions;

export default filtersSlice.reducer;
