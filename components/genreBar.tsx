"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { GenreType } from "@/types/global";
import { usePathname } from "next/navigation";

export default function GenreBar({ genres }: { genres: GenreType[] }) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full absolute group border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left Button */}
      <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center bg-gradient-to-r from-background to-transparent pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Scroll Area */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto p-4 no-scrollbar"
      >
        {/* All */}
        <Button
          asChild
          variant={pathname === "/" ? "default" : "outline"}
          className="flex-none rounded-full hover:bg-black hover:text-white"
        >
          <Link href="/">
            <Play className="mr-2 h-4 w-4" />
            All
          </Link>
        </Button>

        {/* Genres */}
        {genres.map((genre) => {
          const genreUrl = `/genre/${genre.name}/${genre.id}`;
          const isActive = pathname === genreUrl;

          return (
            <Button
              asChild
              key={genre.id}
              variant={isActive ? "default" : "outline"}
              className="flex-none rounded-full hover:bg-black hover:text-white"
            >
              <Link href={genreUrl}>
                <Play className="mr-2 h-4 w-4" />
                {genre.name}
              </Link>
            </Button>
          );
        })}
      </div>

      {/* Right Button */}
      <div className="absolute right-0 top-0 bottom-0 z-20 flex items-center bg-gradient-to-l from-background to-transparent pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Hide scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}