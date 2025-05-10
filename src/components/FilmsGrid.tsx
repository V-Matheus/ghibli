import { getAllFilms } from '@/service/films';
import { Card } from './Card';

export async function MovieGrid() {
  const films = await getAllFilms();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {films.map((film) => (
        <Card key={film.id} film={film} />
      ))}
    </div>
  );
}
