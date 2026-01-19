"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type KnownForItem = {
  id: number;
  title: string;
  poster_path: string;
};

type Props = {
  items: KnownForItem[];
};

export default function CastKnownForCarousel({ items }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    sliderRef.current?.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full">
      <h2 className="text-xl font-bold mb-4 mt-6">Known For</h2>

      {/* Scroll Container */}
      <div
        ref={sliderRef}
        className="
          flex gap-4 overflow-x-auto pb-4
          scroll-smooth
          scrollbar-thin
        "
      >
        {items.map((item) => (
          <Link href={`/movie/${item.id}`} key={item.id}>
            <div className="flex-shrink-0 w-[140px]">
              {/* Poster */}
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-md">
                <Image
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.title}
                  fill
                  sizes="140px"
                  className="object-cover"
                  priority={false}
                />
              </div>

              {/* Title */}
              <p className="mt-2 text-sm text-center leading-tight">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
