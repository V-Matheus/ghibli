export default function Home() {
  return (
    <main className="flex flex-1">
      <header className="flex flex-col items-center justify-center w-full gap-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
          Studio Ghibli Collection
        </h1>
        <p className="text-center text-gray-600 max-w-2xl">
          Explore the magical world of Studio Ghibli films. Mark your favorites
          and keep track of what you`ve watched.
        </p>
      </header>
    </main>
  );
}
