import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilmInteraction {
  id: string;
  isWatched?: boolean;
  isFavorite?: boolean;
  note?: string | null;
  rate?: number | null;
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
      const { id, isWatched, isFavorite, note, rate } = action.payload;
      const existingIndex = state.interactiveFilms.findIndex(
        (film) => film.id === id,
      );
      const hasInteraction = !!isWatched || !!isFavorite || !!note;

      if (existingIndex !== -1) {
        const film = state.interactiveFilms[existingIndex];

        if (isWatched !== undefined) film.isWatched = isWatched;
        if (isFavorite !== undefined) film.isFavorite = isFavorite;
        if (note !== undefined) film.note = note;

        const isEmpty =
          !film.isWatched &&
          !film.isFavorite &&
          (!film.note || film.note.trim() === '');

        if (isEmpty) {
          state.interactiveFilms.splice(existingIndex, 1);
        }
      } else if (hasInteraction) {
        state.interactiveFilms.push({
          id,
          isWatched: isWatched ?? false,
          isFavorite: isFavorite ?? false,
          note: note ?? null,
          rate: rate ?? null,
        });
      }
    },
  },
});

export const { setFilms } = filmsSlice.actions;

export default filmsSlice.reducer;
