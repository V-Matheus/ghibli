'use client';
import { Card } from './Card';
import { useFilms } from '@/hooks/useFilms';

export function MovieGrid() {
  const { filteredFilms } = useFilms();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredFilms.map((film) => (
        <Card key={film.id} film={film} />
      ))}
    </div>
  );
}
