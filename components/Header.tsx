"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, X } from "lucide-react";
import GenreBar from "@/components/genreBar";
import { GenreType } from "@/types/global";
import Drawer from "./Drawer";
import NextMovieLogo from "./ui/logo";

type Props = {
  genres: GenreType[];
};

export default function Header({ genres }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // scrolling down
        setShowHeader(false);
      } else {
        // scrolling up
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = String(fd.get("q") ?? "");
    if (q === "") return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
  }

  return (
    <header
      className={`
        sticky top-0 z-50 bg-accent border-b
        transition-transform duration-300 ${(pathname === "/" || pathname.startsWith("/genre/")) && "mb-16"}
        ${showHeader ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <Drawer open={openDrawer} setOpen={setOpenDrawer} />
      <div className="flex items-center justify-between p-4">
        <div className={`${searchOpen ? "hidden sm:flex" : ""}`}>
          <NextMovieLogo />
        </div>

        <form
          onSubmit={onSubmit}
          className="hidden sm:flex flex-1 max-w-xs gap-2"
        >
          <Input name="q" placeholder="Search" />
          <Button type="submit">Search</Button>
        </form>

        <div className="flex items-center sm:hidden">
          {!searchOpen ? (
            <div>
              <button
                aria-label="Open search"
                className="p-2"
                onClick={() => setSearchOpen(true)}
              >
                <Search />
              </button>
              <button
                aria-label="Open Drawer"
                className="p-2"
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                {openDrawer ? <X /> : <Menu />}
              </button>
            </div>
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
      {(pathname === "/" || pathname.startsWith("/genre/")) && (
        <GenreBar genres={genres} />
      )}
    </header>
  );
}
