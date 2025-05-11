import { FilmInteraction } from '@/store/slices/films-slice';
import { FiltersState } from '@/store/slices/filters-slice';

export function applyFilters(
  films: FilmProps[],
  filters: FiltersState,
  interactions: FilmInteraction[],
): FilmProps[] {
  const { isWatched, isFavorite, withNotes, minStars, search, sortOrder } =
    filters;

  console.log('films', films);

  const filteredFilms = films.filter((film) => {
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

    if (search.query) {
      const matchesTitle = film.title
        .toLowerCase()
        .includes(search.query.toLowerCase());

      const matchesSynopsis = film.description
        ?.toLowerCase()
        .includes(search.query.toLowerCase());

      if (search.includeSynopsis) {
        if (!matchesTitle && !matchesSynopsis) {
          return false;
        }
      } else {
        if (!matchesTitle) {
          return false;
        }
      }
    }
    return true;
  });

  const sortedFilms = [...filteredFilms].sort((a, b) => {
    switch (sortOrder) {
      case 'title-az':
        return a.title.localeCompare(b.title);
      case 'title-za':
        return b.title.localeCompare(a.title);
      case 'duration-shortest':
        return parseInt(a.running_time, 10) - parseInt(b.running_time, 10);
      case 'duration-longest':
        return parseInt(b.running_time, 10) - parseInt(a.running_time, 10);
      case 'rating-highest':
        return (
          parseInt(b.rt_score || '0', 10) - parseInt(a.rt_score || '0', 10)
        );
      case 'rating-lowest':
        return (
          parseInt(a.rt_score || '0', 10) - parseInt(b.rt_score || '0', 10)
        );
      case 'score-highest':
        return parseInt(b.rt_score, 10) - parseInt(a.rt_score, 10);
      case 'score-lowest':
        return parseInt(a.rt_score, 10) - parseInt(b.rt_score, 10);
      default:
        return 0;
    }
  });

  return sortedFilms;
}
