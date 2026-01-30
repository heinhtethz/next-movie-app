"use client";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (searchOpen) {
      const el = document.getElementById(
        "mobile-search-input",
      ) as HTMLInputElement | null;
      el?.focus();
    }
  }, [searchOpen]);

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
        {!searchOpen && (
          <h1 className="text-2xl font-bold flex-1 flex items-center gap-1 md:flex-none">
            <Clapperboard />
            <span>Next Movie</span>
          </h1>
        )}

        <form
          onSubmit={onSubmit}
          className="hidden sm:flex flex-1 max-w-xs gap-2"
        >
          <Input name="q" placeholder="Search" />
          <Button type="submit">Search</Button>
        </form>

        <div className="flex items-center sm:hidden ml-auto">
          {!searchOpen ? (
            <button
              aria-label="Open search"
              className="p-2"
              onClick={() => setSearchOpen(true)}
            >
              <Search />
            </button>
          ) : (
            <div className="max-w-md flex justify-between gap-5">
              <div className="md:hidden">
                <form onSubmit={onSubmit} className="flex gap-2">
                  <Input
                    id="mobile-search-input"
                    name="q"
                    placeholder="Search movies..."
                  />
                  <Button type="submit">Search</Button>
                </form>
              </div>
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
