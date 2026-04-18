import { Dispatch, SetStateAction, useEffect } from "react";

export default function Drawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy & Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 ${
        open ? "pointer-events-auto" : "pointer-events-none overflow-hidden"
      }`}
    >
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 transition-opacity duration-300 z-40
        ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Drawer */}
      <div
        className={`absolute top-[70px] right-0 h-screen w-full bg-gray-100 shadow-xl
        transform transition-transform duration-500 z-50
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col gap-4 p-6 overflow-y-auto h-full border-t-2">
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
    </div>
  );
}
