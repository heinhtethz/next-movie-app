import React from "react";
import { fetchPopular, fetchTrending } from "@/lib/fetchData";
import MovieSection from "@/components/MovieSection";

export default async function Home() {
  const [trending, popular] = await Promise.all([
    fetchTrending(),
    fetchPopular(),
  ]);

  const sections = [
    {
      title: "Trending this week",
      items: trending,
    },
    {
      title: "Popular",
      items: popular,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto max-w-screen-xl md:px-4">
        {sections.map((section) => (
          <MovieSection
            key={section.title}
            title={section.title}
            items={section.items}
          />
        ))}
      </div>
    </main>
  );
}
