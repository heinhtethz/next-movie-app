"use client";

import { Dispatch, Fragment, SetStateAction } from "react";
import { Transition, TransitionChild } from "@headlessui/react";

export default function Drawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const links = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy & Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  return (
    <Transition show={open} as={Fragment}>
      <div className="relative z-50">
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 top-[70px] bg-black/30" />
        </TransitionChild>

        {/* Container */}
        <div className="fixed inset-0 top-[70px] flex justify-end">
          {/* Sheet */}
          <TransitionChild
            as={Fragment}
            enter="transition-transform duration-500 ease-out"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-500 ease-in"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div
              className="
                h-dvh
                w-full sm:w-[420px]
                bg-gray-100 shadow-xl
              "
            >
              <div className="flex h-full flex-col gap-4 border-t-2 p-6">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Transition>
  );
}
