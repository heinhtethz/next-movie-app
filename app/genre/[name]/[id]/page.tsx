import MovieSection from "@/components/MovieSection";
import { fetchMoviesByGenre } from "@/lib/fetchData";
import type { GenreType } from "@/types/global";

export default async function Genre({
  params,
}: {
  params: Promise<GenreType>;
}) {
  const { id, name } = await params;
  const movies = await fetchMoviesByGenre(id);

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto max-w-screen-xl md:px-4">
        <MovieSection title={name} items={movies} />
      </div>
    </main>
  );
}
