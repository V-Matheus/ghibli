import { getAllFilms } from '@/service/films';
import { useEffect, useState } from 'react';

export function useFilms() {
  const [films, setFilms] = useState<FilmProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await getAllFilms();
        setFilms(response);
      } catch (err) {
        setError('Failed to fetch films');
        console.error('Error fetching films:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return { films, loading, error };
}
