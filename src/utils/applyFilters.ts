import { FilmInteraction } from '@/store/slices/films-slice';
import { FiltersState } from '@/store/slices/filters-slice';

export function applyFilters(
  films: FilmProps[],
  filters: FiltersState,
  interactions: FilmInteraction[],
): FilmProps[] {
  const { isWatched, isFavorite, withNotes, minStars, search } = filters;

  return films.filter((film) => {
    const interaction = interactions.find((i) => i.id === film.id);

    if (isWatched && interaction?.isWatched !== isWatched) {
      return false;
    }

    if (isFavorite && interaction?.isFavorite !== isFavorite) {
      return false;
    }

    if (
      withNotes &&
      withNotes &&
      (!interaction?.note || interaction.note.trim() === '')
    ) {
      return false;
    }

    if (minStars) {
      if (minStars === 'any-rating') {
        if (interaction?.rate === null || interaction?.rate === undefined) {
          return false;
        }
      } else if (minStars === 'unrated') {
        if (interaction?.rate !== null && interaction?.rate !== undefined) {
          return false;
        }
      } else {
        const minStarsValue = parseInt(minStars.split('-')[0], 10);
        if (
          interaction?.rate === null ||
          interaction?.rate === undefined ||
          interaction.rate !== minStarsValue
        ) {
          return false;
        }
      }
    }

    if (
      search.query &&
      !film.title.toLowerCase().includes(search.query.toLowerCase())
    ) {
      return false;
    }

    // if (search.includeSynopsis && search.query) {
    //   const matchesSynopsis = film.synopsis
    //     ?.toLowerCase()
    //     .includes(search.query.toLowerCase());
    //   const matchesTitle = film.title
    //     .toLowerCase()
    //     .includes(search.query.toLowerCase());
    //   if (!matchesSynopsis && !matchesTitle) {
    //     return false;
    //   }
    // }

    return true;
  });
}
