import { Clapperboard } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const NextMovieLogo = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.push("/")}>
      <h1
        className={`text-lg md:text-2xl font-bold flex items-center gap-1 cursor-pointer select-none
          `}
      >
        <Clapperboard />
        <span>Next Movie</span>
      </h1>
    </div>
  );
};

export default NextMovieLogo;
