import {
  GenreType,
  MovieType,
  PersonDetailType,
  PersonType,
} from "@/types/global";

export async function fetchMovieDetail(id: number): Promise<MovieType> {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  });

  return await res.json();
}

export async function fetchCast(id: number): Promise<PersonType[]> {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  });
  const result = await res.json();
  return result.cast;
}

export async function fetchMoviesByGenre(id: number): Promise<MovieType[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_KEY}`,
      },
    }
  );

  const data = await res.json();
  return data.results;
}

export async function fetchGenres(): Promise<GenreType[]> {
  const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  });

  const data = await res.json();

  return data.genres;
}

export async function fetchCrew(id: number): Promise<PersonType[]> {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  });
  const result = await res.json();
  return result.crew;
}

export async function fetchCastDetails(id: number): Promise<PersonDetailType> {
  const res = await fetch(`https://api.themoviedb.org/3/person/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  });
  const result = await res.json();
  return result;
}

export async function fetchMoviesByCast(id: number): Promise<MovieType[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_KEY}`,
      },
    }
  );
  const result = await res.json();
  return result;
}

export async function fetchPopularMoviesByCast(
  id: number
): Promise<MovieType[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_KEY}`,
      },
    }
  );
  const result = await res.json();
  const popularMovies = result.cast.sort(
    (a: { popularity: number }, b: { popularity: number }) =>
      b.popularity - a.popularity
  );
  return popularMovies.slice(0, 10);
}

export async function fetchTrending(): Promise<MovieType[]> {
  const res = await fetch("https://api.themoviedb.org/3/trending/movie/week", {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  });

  const data = await res.json();

  return data.results;
}

export async function fetchPopular(): Promise<MovieType[]> {
  const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  });

  const data = await res.json();

  return data.results;
}
