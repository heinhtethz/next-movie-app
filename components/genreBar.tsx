"use client";

import { useRef } from "react"; // Added useRef
import Link from "next/link";
import { Button } from "./ui/button";
import { Play, ChevronLeft, ChevronRight } from "lucide-react"; // Added Arrow Icons
import { GenreType } from "@/types/global";
import { usePathname, useSearchParams } from "next/navigation";

export default function GenreBar({ genres }: { genres: GenreType[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeGenreId = searchParams.get("genreId");

  // 1. Create a reference to the scroll container
  const scrollRef = useRef<HTMLDivElement>(null);

  // 2. Function to handle scrolling
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust scroll distance
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (pathname === "/" || pathname.startsWith("/genre/")) {
    return (
      // Container changed from w-[200px] to w-full and added relative positioning
      <div className="w-full relative group border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Left Scroll Button (Visible on hover) */}
        <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center bg-gradient-to-r from-background to-transparent pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Scrollable Area */}
        {/* Changed flex-col to flex-row, added overflow-x-auto, removed wrapping */}
        <div
          ref={scrollRef}
          className="flex flex-row items-center gap-2 overflow-x-auto p-4 no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hides scrollbar in Firefox/IE
        >
          {/* 'All' Button */}
          <Button
            asChild
            variant={
              activeGenreId === "undefined" || pathname === "/"
                ? "default"
                : "outline"
            }
            // Added flex-none to prevent shrinking
            className="flex-none rounded-full hover:bg-black hover:text-white"
          >
            <Link href={"/"}>
              <Play className="mr-2 h-4 w-4" />
              All
            </Link>
          </Button>

          {/* Genre Buttons */}
          {genres?.map((genre) => {
            const genreUrl = `/genre/${genre.name}/${genre.id}`;
            const isActive =
              pathname === genreUrl || activeGenreId === genre.id.toString();

            return (
              <Button
                asChild
                key={genre.id}
                variant={isActive ? "default" : "outline"}
                // Added flex-none to prevent shrinking
                className="flex-none rounded-full hover:bg-black hover:text-white"
              >
                <Link href={`/genre/${genre.name}/${genre.id}`}>
                  <Play className="mr-2 h-4 w-4" />
                  {genre.name}
                </Link>
              </Button>
            );
          })}
        </div>

        {/* Right Scroll Button (Visible on hover) */}
        <div className="absolute right-0 top-0 bottom-0 z-20 flex items-center bg-gradient-to-l from-background to-transparent pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Hide Scrollbar Style for Chrome/Safari */}
        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    );
  }
}
