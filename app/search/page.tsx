import MovieCard from "@/components/MovieCard";
import Movie from "@/components/MovieCard";
import type { MovieType } from "@/types/global";

async function fetchSearch(q: string): Promise<MovieType[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${q}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_KEY}`,
      },
    },
  );

  const data = await res.json();

  return data.results;
}

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const q = (await searchParams).q;
  const movieBySearch = await fetchSearch(q);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <h2 className="text-lg font-bold mb-4 pb-2 border-b">Search: {q}</h2>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-1 md:gap-6"
        role="list"
      >
        {movieBySearch.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
}
