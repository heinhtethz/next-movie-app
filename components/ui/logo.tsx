import { Clapperboard } from "lucide-react";
import React from "react";

const NextMovieLogo = () => {
  return (
    <div>
      <h1
        className={`text-lg md:text-2xl font-bold flex items-center gap-1
          `}
      >
        <Clapperboard />
        <span>Next Movie</span>
      </h1>
    </div>
  );
};

export default NextMovieLogo;
