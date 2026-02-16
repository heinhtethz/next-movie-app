import Biography from "@/components/biography";
import CastKnownForCarousel from "@/components/castKnownForCarousel";
import { Info } from "@/components/Info";
import birthdayCalculate, { formatDate } from "@/lib/birthdayCalculate";
import { fetchCastDetails, fetchPopularMoviesByCast } from "@/lib/fetchData";
import Image from "next/image";

type PageProps = {
  params: Promise<{ id: number }>;
};

export default async function Person({ params }: PageProps) {
  const { id } = await params;
  const castDetails = await fetchCastDetails(id);
  const knownFor = await fetchPopularMoviesByCast(id);

  const knownForData = knownFor.map((item) => ({
    id: item.id,
    title: item.title,
    poster_path: item.poster_path,
  }));

  const profileBaseUrl = "https://image.tmdb.org/t/p/w300";
  const profileSrc = castDetails.profile_path
    ? profileBaseUrl + castDetails.profile_path
    : "/placeholder-profile.png";

  const genderMap: Record<number, string> = {
    1: "Female",
    2: "Male",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 max-w-7xl m-auto p-5">
      {/* Left Section */}
      <div className="col-span-1 flex flex-col gap-4">
        <Image
          src={profileSrc}
          alt={castDetails.name}
          width={200}
          height={700}
          className="w-fit lg:w-full m-auto lg:m-0 rounded-xl object-cover aspect-square lg:aspect-auto"
        />

        <h1 className="font-bold text-4xl text-center mb-5 lg:hidden">
          {castDetails.name}
        </h1>

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

      {/* Right Section */}
      <div className="col-span-3">
        <h1 className="font-bold text-4xl mb-5 hidden lg:block">
          {castDetails.name}
        </h1>

        <Biography biography={castDetails.biography} />
        <CastKnownForCarousel items={knownForData} />
      </div>
    </div>
  );
}
