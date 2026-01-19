"use client";

import { useState } from "react";

export default function Biography({ biography }: { biography: string }) {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 500;

  const isLong = biography.length > MAX_LENGTH;
  const displayText = expanded ? biography : biography.slice(0, MAX_LENGTH);

  return (
    <div className="w-full">
      <h3 className="font-bold text-xl mb-2">Biography</h3>

      <p className="leading-relaxed">
        {displayText}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-2 font-bold text-sm text-cyan-500 hover:text-emerald-500"
          >
            {expanded ? "Read Less" : "Read More..."}
          </button>
        )}
      </p>
    </div>
  );
}
