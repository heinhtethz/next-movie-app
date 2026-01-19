import { MovieType } from "@/types/global";
import MovieCard from "./MovieCard";

export default function MovieSection({
  title,
  items,
}: {
  title: string;
  items: MovieType[];
}) {
  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold mb-8">{title}</h2>

      {items.length === 0 ? (
        <p className="text-sm text-slate-600">No results found.</p>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-1 md:gap-6"
          role="list"
        >
          {items.map((movie) => (
            <div role="listitem" key={movie.id} className="mb-2">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
