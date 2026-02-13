import type { MovieType } from "@/types/global";
import Image from "next/image";
import Link from "next/link";

type MovieProps = {
  movie: MovieType;
  currentGenreId?: string;
};

export default function MovieCard({ movie, currentGenreId }: MovieProps) {
  const posterBaseUrl = "https://image.tmdb.org/t/p/w185";

  const posterSrc = movie.poster_path
    ? posterBaseUrl + movie.poster_path
    : "/placeholder.jpg";

  const href = currentGenreId
    ? `/movie/${movie.id}?genreId=${currentGenreId}`
    : `/movie/${movie.id}`;

  return (
    <div className="flex flex-col items-center w-full">
      <Link href={href} className="group w-full">
        <Image
          src={posterSrc}
          alt={posterSrc}
          width={500}
          height={750}
          className="
            w-full
            aspect-[2/3]
            bg-gray-500
            rounded-lg
            object-cover
            transition-transform duration-200
            group-hover:scale-105
          "
        />
      </Link>

      <h3 className="text-md font-bold text-center">{movie.title}</h3>

      {movie.release_date && (
        <span className="text-sm text-slate-500">{movie.release_date}</span>
      )}
    </div>
  );
}
