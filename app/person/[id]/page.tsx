import Biography from "@/components/biography";
import CastKnownForCarousel from "@/components/castKnownForCarousel";
import birthdayCalculate, { formatDate } from "@/lib/birthdayCalculate";
import { fetchCastDetails, fetchPopularMoviesByCast } from "@/lib/fetchData";
import Image from "next/image";

type PageProps = {
  params: Promise<{ id: number }>;
};

type InfoProps = {
  label: string;
  value?: string | string[];
};

export default async function Person({ params }: PageProps) {
  const { id } = await params;
  const castDetails = await fetchCastDetails(id);
  const knownFor = await fetchPopularMoviesByCast(id);
  const knownForData = knownFor.map((item) => {
    return {
      id: item.id,
      title: item.title,
      poster_path: item.poster_path,
    };
  });

  const profileBaseUrl = "https://image.tmdb.org/t/p/w300";
  const profileSrc = castDetails.profile_path
    ? profileBaseUrl + castDetails.profile_path
    : "/placeholder-profile.png";

  const genderMap: Record<number, string> = {
    1: "Female",
    2: "Male",
  };

  return (
    <div className="flex justify-center gap-5">
      {/* Left Section */}

      <div className="max-w-2xl flex flex-col gap-4">
        <img
          src={profileSrc}
          alt={castDetails.name}
          className="rounded-xl object-cover w-[300px] h-[450px]"
        />
        {/* Personal Info */}
        <div>
          <h3 className="font-bold text-xl mb-4">Personal Info</h3>

          <Info label="Known For" value={castDetails.known_for_department} />
          <Info
            label="Gender"
            value={genderMap[castDetails.gender] ?? "Not specified"}
          />
          <Info
            label="Date of Birth"
            value={birthdayCalculate(castDetails.birthday)}
          />
          <Info
            label="Date of Death"
            value={formatDate(castDetails.deathday ?? "—")}
          />
          <Info label="Place of Birth" value={castDetails.place_of_birth} />
          <Info label="Also Known As" value={castDetails.also_known_as} />
        </div>
      </div>

      <div className="max-w-4xl">
        <h1 className="font-bold text-3xl mb-5">{castDetails.name}</h1>
        <Biography biography={castDetails.biography} />
        <CastKnownForCarousel items={knownForData} />
      </div>
    </div>
  );
}

function Info({ label, value }: InfoProps) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return (
      <div className="mb-3">
        <h5 className="font-semibold text-md">{label}</h5>
        <p>-</p>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <h5 className="font-semibold text-md">{label}</h5>

      {Array.isArray(value) ? (
        <ul className="list-none list-inside">
          {value.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}
