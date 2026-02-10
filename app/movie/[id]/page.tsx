import Image from "next/image";
import CircleProgress from "@/components/circleProgress";
import { fetchCast, fetchCrew, fetchMovieDetail } from "@/lib/fetchData";
import Link from "next/link";
import {
  HeartFilledIcon,
  BookmarkFilledIcon,
  ListBulletIcon,
  PlayIcon,
} from "@radix-ui/react-icons";

const TMDB_IMAGE = {
  backdrop: "https://image.tmdb.org/t/p/w1280",
  poster: "https://image.tmdb.org/t/p/w342",
  profile: "https://image.tmdb.org/t/p/w185",
};

type PageProps = {
  params: Promise<{ id: number }>;
};

export default async function Movie({ params }: PageProps) {
  const { id } = await params;

  // Parallel fetching
  const [movie, cast, crew] = await Promise.all([
    fetchMovieDetail(id),
    fetchCast(id),
    fetchCrew(id),
  ]);

  const userScore = Math.round(movie.vote_average * 10);
  const director = crew.find((p) => p.job === "Director");
  const writers = crew.filter((p) => p.job === "Writer");

  return (
    <div>
      {/* Destop*/}
      <div className="relative w-full overflow-hidden min-h-[55vh] md:min-h-[45vh] hidden md:block">
        <div className="absolute inset-0 -z-20">
          {movie.backdrop_path ? (
            <Image
              src={`${TMDB_IMAGE.backdrop}${movie.backdrop_path}`}
              alt={`${movie.title} backdrop`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-900" />
          )}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/70 to-black/20" />

        {/* Content (defines height) */}
        <div className="relative">
          <div className="max-w-6xl mx-auto px-6 py-8 md:py-12 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Poster */}
            <div className="flex-shrink-0">
              {movie.poster_path ? (
                <Image
                  src={`${TMDB_IMAGE.poster}${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  width={260}
                  height={390}
                  className="rounded-xl shadow-2xl object-cover"
                  priority
                />
              ) : (
                <div className="w-[180px] md:w-[260px] h-[270px] md:h-[390px] rounded-xl bg-gray-800" />
              )}
            </div>

            {/* Details */}
            <div className="flex-1 text-white w-full">
              <h1 className="text-2xl md:text-4xl font-semibold tracking-tight leading-tight">
                {movie.title}{" "}
                <span className="text-lg md:text-2xl font-light opacity-80">
                  ({movie.release_date?.split("-")[0] ?? "—"})
                </span>
              </h1>

              {/* Genres */}
              <div className="mt-2 text-sm text-gray-300 flex flex-wrap gap-2">
                {movie.genres.map((genre, index) => (
                  <Link
                    key={genre.id}
                    href={`/genre/${genre.name}/${genre.id}`}
                    className="hover:text-white text-sm"
                  >
                    {genre.name}
                    {index < movie.genres.length - 1 ? "," : ""}
                  </Link>
                ))}
              </div>

              {/* Score + Vibe */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 mt-6 gap-4">
                <div className="flex items-center gap-3">
                  <CircleProgress value={userScore} />
                  <span className="text-sm font-semibold leading-snug">
                    User
                    <br />
                    Score
                  </span>
                </div>

                <div className="mt-1 sm:mt-0 bg-[#032541] px-4 py-2 rounded-full font-semibold hover:scale-105 transition-transform inline-flex items-center">
                  What&apos;s your{" "}
                  <span className="ml-1 border-b-2 border-[#01B4E4]">Vibe</span>
                  ?
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <div className="flex items-center gap-3">
                  {[ListBulletIcon, HeartFilledIcon, BookmarkFilledIcon].map(
                    (Icon, i) => (
                      <button
                        key={i}
                        aria-label="action"
                        className="w-10 h-10 bg-[#032541] rounded-full flex items-center justify-center"
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    ),
                  )}

                  <button className="flex items-center gap-2 font-semibold cursor-pointer bg-white/5 px-3 py-2 rounded-md hover:underline">
                    <PlayIcon className="w-5 h-5" />
                    <span>Play Trailer</span>
                  </button>
                </div>
              </div>

              {/* Overview */}
              <h2 className="text-xl font-semibold mt-6 mb-2">Overview</h2>
              <p className="text-gray-300 leading-relaxed max-w-3xl text-sm md:text-base">
                {movie.overview}
              </p>

              {/* Crew */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-8">
                {director && (
                  <div>
                    <p className="font-semibold cursor-pointer underline hover:text-gray-300">
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

      {/* MOBILE */}
      <div className="md:hidden relative">
        {/* Backdrop (short) */}
        <div className="relative w-full h-[220px]">
          <Image
            src={`${TMDB_IMAGE.backdrop}${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Content (solid background) */}
        <div className="bg-[#605e5e] text-white px-4 py-6">
          <div className="flex gap-4 absolute top-8">
            {/* Poster */}
            <Image
              src={`${TMDB_IMAGE.poster}${movie.poster_path}`}
              alt={movie.title}
              width={90}
              height={135}
              className="rounded-md object-cover"
            />
          </div>
          {/* Title + Score */}
          <div className="flex-1 text-center">
            <h1 className="text-xl font-semibold leading-tight">
              {movie.title} ({movie.release_date?.split("-")[0]})
            </h1>
            <div className="flex justify-around mt-4">
              <div className="flex items-center gap-3 mt-2">
                <CircleProgress value={userScore} />
                <span className="text-lg font-semibold">User Score</span>
              </div>
              <div className="mt-1 sm:mt-0 font-semibold hover:scale-105 transition-transform inline-flex items-center">
                What&apos;s your{" "}
                <span className="ml-1 border-b-2 border-[#01B4E4]">Vibe</span>?
              </div>
            </div>
          </div>
          {/* Meta */}
          <div className="flex justify-center items-center gap-3 mt-4 text-sm font-semibold">
            <span className="px-2 py-0.5 border rounded">R</span>
            <span>1h 30m</span>
            <button className="flex items-center gap-1">
              <PlayIcon /> Play Trailer
            </button>
          </div>

          {/* Genres */}
          <p className="text-sm text-gray-200 mt-2 text-center">
            {movie.genres.map((g) => g.name).join(", ")}
          </p>

          {/* Overview */}
          <h2 className="mt-6 font-semibold text-lg">Overview</h2>
          <p className="text-sm leading-relaxed mt-2">{movie.overview}</p>
          {/* Crew */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-8">
            {director && (
              <div>
                <p className="font-semibold cursor-pointer underline hover:text-gray-300">
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

      {/* CAST */}
      <section className="w-full max-w-[1440px] mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Top Billed Cast</h2>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
          {cast.map((person) => (
            <div
              key={person.id}
              className="flex flex-col items-center text-center"
            >
              <Link href={`/person/${person.id}`} className="group w-[185px]">
                {person.profile_path ? (
                  <Image
                    src={`${TMDB_IMAGE.profile}${person.profile_path}`}
                    alt={person.name}
                    width={185}
                    height={278}
                    className="rounded-xl object-cover transition-transform duration-200 group-hover:scale-[1.02]"
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
