import { getAllFilms } from '@/service/films';
import { RootState } from '@/store/store';
import { applyFilters } from '@/utils/applyFilters';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorageActions';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function useFilms() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredFilms, setFilteredFilms] = useState<FilmProps[]>([]);

  const filtersState = useSelector((state: RootState) => state.filters);

  const filmInteractions = useSelector(
    (state: RootState) => state.films.interactiveFilms,
  );

  const fetchAndFilterFilms = useCallback(async () => {
    try {
      const filmsLocal = getLocalStorage('films');
      const films: FilmProps[] = filmsLocal
        ? JSON.parse(filmsLocal)
        : await getAllFilms();

      if (!filmsLocal) {
        setLocalStorage('films', JSON.stringify(films));
      }

      const noFiltersActive =
        !filtersState.isWatched &&
        !filtersState.isFavorite &&
        !filtersState.withNotes &&
        !filtersState.sortOrder &&
        (!filtersState.minStars || filtersState.minStars === '') &&
        (!filtersState.search.query || filtersState.search.query.trim() === '');

      const filtered = noFiltersActive
        ? films
        : applyFilters(films, filtersState, filmInteractions);

        console.log('Filtered films:', filtered);
        

      setLocalStorage('filteredFilms', JSON.stringify(filtered));
      setFilteredFilms(filtered);
    } catch (err) {
      setError('Failed to fetch films');
      console.error('Error fetching films:', err);
    } finally {
      setLoading(false);
    }
  }, [filmInteractions, filtersState]);

  useEffect(() => {
    fetchAndFilterFilms();
  }, [fetchAndFilterFilms]);

  return { loading, error, filteredFilms };
}
