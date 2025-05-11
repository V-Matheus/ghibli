import { MovieGrid } from '@/components/FilmsGrid';
import { FiltersSorting } from '@/components/FiltersSorting';

export default async function Home() {
  return (
    <main className="flex flex-col flex-1 p-4 md:p-8">
      <header className="flex flex-col items-center justify-center w-full gap-4 mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Studio Ghibli Collection
        </h1>
        <p className="text-center text-gray-600 max-w-2xl">
          Explore the magical world of Studio Ghibli films. Mark your favorites
          and keep track of what you`ve watched.
        </p>
      </header>

      <FiltersSorting />

      <article className="space-y-6 mt-6">
        <MovieGrid />
      </article>
    </main>
  );
}
