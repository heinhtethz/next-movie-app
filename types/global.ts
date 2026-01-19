export type MovieType = {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: GenreType[];
  vote_average: number;
};

export type GenreType = {
  id: number;
  name: string;
};

export type PersonType = {
  id: number;
  name: string;
  profile_path: string;
  character: string;
  job: string;
};

export type PersonDetailType = {
  id: number;
  name: string;
  profile_path: string;
  known_for_department: string;
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  place_of_birth: string;
  also_known_as: string[];
};
