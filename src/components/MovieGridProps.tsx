import { Card } from './Card';

interface FilmeProps {
  id: number;
  title: string;
  original_title: string;
  original_title_romanised: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: number;
  rt_score: number;
  people: string[];
  species: string[];
  locations: string[];
  vehicles: string[];
}

interface MovieGridProps {
  filmes?: FilmeProps[];
}

export function MovieGrid({ filmes = [] }: MovieGridProps) {
  console.log(filmes);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <Card key={index} filme={filmes[index]} />
      ))}
    </div>
  );
}