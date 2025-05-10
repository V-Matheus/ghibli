import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilmInteraction {
  id: string;
  isWatched?: boolean;
  isFavorite?: boolean;
  note?: string | null;
}

interface FilmsState {
  interactiveFilms: FilmInteraction[];
}

const initialState: FilmsState = {
  interactiveFilms: [],
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilms(state, action: PayloadAction<FilmInteraction>) {
      const { id, isWatched, isFavorite, note } = action.payload;

      const existingFilmIndex = state.interactiveFilms.findIndex(
        (film) => film.id === id,
      );

      if (existingFilmIndex !== -1) {
        if (!isWatched && !isFavorite) {
          state.interactiveFilms.splice(existingFilmIndex, 1);
        } else {
          state.interactiveFilms[existingFilmIndex] = {
            ...state.interactiveFilms[existingFilmIndex],
            ...(action.payload.hasOwnProperty('isWatched') && { isWatched }),
            ...(action.payload.hasOwnProperty('isFavorite') && { isFavorite }),
            ...(action.payload.hasOwnProperty('note') && { note }),
          };
        }
      } else {
        if (isWatched || isFavorite) {
          state.interactiveFilms.push({
            id,
            isWatched: isWatched || false,
            isFavorite: isFavorite || false,
            note: note || null,
          });
        }
      }
    },
  },
});

export const { setFilms } = filmsSlice.actions;

export default filmsSlice.reducer;
