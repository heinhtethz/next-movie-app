"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function About() {
  return (
    <div className="bg-border pt-10 pb-20">
      <div className="max-w-3xl font-mono mx-5 md:m-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-10xl  font-bold text-center flex-1">
          Hi there,
        </h1>
        <div className="my-10 flex flex-col gap-5">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold">
            {" "}
            Let&#39;s talk about Next Movie!
          </h2>
          <p>
            The Next Movie is a community built movie. Every piece of data has
            been added by our amazing community dating back to 2008. The Next
            Movie strong international focus and breadth of data is largely
            unmatched and something we&#39;re incredibly proud of. Put simply,
            we live and breathe community and that&#39;s precisely what makes us
            different.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold">
            The Next Movie advantage
          </h3>
          <ul className="list-decimal flex flex-col gap-5">
            <li>
              <p>
                Every year since 2008, the number of contributions to our
                database has increased (check out our last years wrap!) With
                over 1,500,000 developers and companies using our platform, TMDB
                has become a premiere source for metadata.
              </p>
            </li>
            <li>
              <p>
                Along with extensive metadata for movies, TV shows and people,
                we also offer one of the best selections of high resolution
                posters and backdrops. On average, over 1,000 images are added
                every single day.
              </p>
            </li>
            <li>
              <p>
                We&#39;re international. While we officially support 39
                languages we also have extensive regional data. Every single day
                TMDB is used in over 180 countries.
              </p>
            </li>
            <li>
              <p>
                Our community is second to none. Between our staff and community
                moderators, we&#39;re always here to help. We&#39;re passionate
                about making sure your experience on TMDB is nothing short of
                amazing.
              </p>
            </li>
          </ul>
        </div>

        <div className="flex justify-center mt-10">
          <Button
            onClick={() => redirect("/contact")}
            className="hover:scale-105"
          >
            Contact me
          </Button>
        </div>
      </div>
    </div>
  );
}
