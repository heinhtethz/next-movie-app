import CircleProgress from "@/components/circleProgress";
import { fetchCast, fetchCrew, fetchMovieDetail } from "@/lib/fetchData";
import Link from "next/link";
import {
  HeartFilledIcon,
  BookmarkFilledIcon,
  ListBulletIcon,
  PlayIcon,
} from "@radix-ui/react-icons";

// TMDB image base URLs
const TMDB_IMAGE = {
  backdrop: "https://image.tmdb.org/t/p/w1280",
  poster: "https://image.tmdb.org/t/p/w185",
  profile: "https://image.tmdb.org/t/p/w185",
};

type PageProps = {
  params: Promise<{ id: number }>;
};

export default async function Movie({ params }: PageProps) {
  const { id } = await params;

  // TMDB-style parallel fetching
  const [movie, cast, crew] = await Promise.all([
    fetchMovieDetail(id),
    fetchCast(id),
    fetchCrew(id),
  ]);

  const userScore = Math.round(movie.vote_average * 10);

  // TMDB crew logic
  const director = crew.find((p) => p.job === "Director");
  const writers = crew.filter((p) => p.job === "Writer");

  return (
    <div>
      {/* Backdrop */}
      <div className="relative w-full">
        <img
          src={`${TMDB_IMAGE.backdrop}${movie.backdrop_path}`}
          alt={movie.title}
          className="w-screen h-fit lg:h-[600px] object-cover"
        />

        {/* TMDB gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/20" />

        {/* Content container */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-full max-w-6xl px-6 pt-10 flex gap-10">
            {/* Poster */}
            <img
              src={`${TMDB_IMAGE.poster}${movie.poster_path}`}
              alt={movie.title}
              className="w-[300px] h-[450px] rounded-xl object-cover shadow-lg"
            />

            {/* Details */}
            <div className="text-white">
              {/* Title */}
              <h1 className="text-3xl font-semibold tracking-tight">
                {movie.title}{" "}
                <span className="text-xl font-light">
                  ({movie.release_date.split("-")[0]})
                </span>
              </h1>

              {/* Genres */}
              <div className="mt-1 text-sm text-gray-300">
                {movie.genres.map((genre, index) => (
                  <Link
                    key={genre.id}
                    href={`/genre/${genre.name}/${genre.id}`}
                    className="hover:text-white"
                  >
                    {genre.name}
                    {index < movie.genres.length - 1 && ", "}
                  </Link>
                ))}
              </div>

              {/* Score */}
              <div className="flex items-center gap-8 mt-6">
                <div className="flex items-center gap-3">
                  <CircleProgress value={userScore} />
                  <span className="text-sm font-semibold">
                    User <br /> Score
                  </span>
                </div>

                <div className="bg-[#032541] px-4 py-2 rounded-full font-semibold hover:scale-105 transition">
                  What&apos;s your{" "}
                  <span className="border-b-2 border-[#01B4E4]">Vibe</span>?
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-6">
                {[ListBulletIcon, HeartFilledIcon, BookmarkFilledIcon].map(
                  (Icon, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-[#032541] rounded-full flex items-center justify-center"
                    >
                      <Icon />
                    </div>
                  ),
                )}

                <div className="flex items-center gap-2 font-semibold cursor-pointer">
                  <PlayIcon className="size-6" />
                  <span className="hover:underline">Play Trailer</span>
                </div>
              </div>

              {/* Overview */}
              <h2 className="text-xl font-semibold mt-6 mb-2">Overview</h2>
              <p className="text-gray-300 leading-relaxed max-w-2xl">
                {movie.overview}
              </p>

              {/* Crew (TMDB style) */}
              <div className="grid grid-cols-2 gap-x-20 gap-y-6 mt-8">
                {director && (
                  <div>
                    <p className="font-semibold cursor-pointer underline hover:text-gray-300 ">
                      {director.name}
                    </p>
                    <p className="text-sm text-gray-400">Director</p>
                  </div>
                )}

                {writers.map((writer) => (
                  <div key={writer.id}>
                    <p className="font-semibold cursor-pointer underline hover:text-gray-300">
                      {writer.name}
                    </p>
                    <p className="text-sm text-gray-400">{writer.job}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast */}
      <section className="w-full max-w-[1440px] mx-auto px-6 mt-12">
        <h2 className="text-2xl font-bold mb-6">Top Billed Cast</h2>

        <div
          className="grid gap-6 
                  grid-cols-2 
                  sm:grid-cols-3 
                  md:grid-cols-4 
                  lg:grid-cols-6 
                  xl:grid-cols-7"
        >
          {cast.map((person) => (
            <div
              key={person.id}
              className="flex flex-col items-center text-center"
            >
              <Link href={`/person/${person.id}`} className="group w-[185px]">
                {person.profile_path ? (
                  <img
                    src={`${TMDB_IMAGE.profile}${person.profile_path}`}
                    alt={person.name}
                    className="w-[185px] h-[278px] object-cover rounded-xl 
                         transition-transform duration-200 
                         group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-[185px] h-[278px] bg-gray-300 rounded-xl" />
                )}

                <p className="mt-3 font-semibold leading-tight group-hover:underline">
                  {person.name}
                </p>
              </Link>

              <p className="text-sm text-gray-600 mt-1 leading-snug">
                {person.character}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
