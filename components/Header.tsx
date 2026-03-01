"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clapperboard, Search, X } from "lucide-react";
import GenreBar from "@/components/genreBar";
import { GenreType } from "@/types/global";

type Props = {
  genres: GenreType[];
};

export default function Header({ genres }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const q = String(fd.get("q") ?? "");
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-10 bg-accent border-b">
      <div className="flex items-center justify-between p-4">
        <h1
          className={`text-lg md:text-2xl font-bold flex items-center gap-1
          ${searchOpen ? "hidden sm:flex" : ""}
          `}
        >
          <Clapperboard />
          <span>Next Movie</span>
        </h1>

        <form
          onSubmit={onSubmit}
          className="hidden sm:flex flex-1 max-w-xs gap-2"
        >
          <Input name="q" placeholder="Search" />
          <Button type="submit">Search</Button>
        </form>

        <div className="flex items-center sm:hidden">
          {!searchOpen ? (
            <button
              aria-label="Open search"
              className="p-2"
              onClick={() => setSearchOpen(true)}
            >
              <Search />
            </button>
          ) : (
            <div className="flex gap-5">
              <form onSubmit={onSubmit} className="flex gap-2">
                <Input name="q" placeholder="Search movies..." />
                <Button type="submit">Search</Button>
              </form>

              <button
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                <X />
              </button>
            </div>
          )}
        </div>
      </div>

      <GenreBar genres={genres} />
    </header>
  );
}
