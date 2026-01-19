import Link from "next/link";
import {
  Clapperboard,
  Github,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";

type LinkType = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

// --- Configuration Data ---
const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const COMMUNITY_LINKS = [
  { label: "Twitter / X", href: "https://twitter.com", icon: Twitter },
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" },
];

// --- Icons (SVG Paths) ---
const ICONS = {
  apple: (
    <svg viewBox="0 0 384 512" fill="currentColor" height="1.2em" width="1.2em">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 46.9 92.1 77.6 92.1 32.4 0 44.9-26.9 77.3-26.9 31.2 0 45.8 25.2 74 27.1 27.8 1.9 53.7-23.4 72.2-51.3-30.2-17.4-50.5-54.2-50.8-127zm-49.6-123c17.9-19.1 35.3-47.4 31.5-86-31.2 3.4-60.4 23-78.9 51.5-14.5 19.8-30.7 46.9-28 80.9 36.4 3 64.5-20.5 75.4-46.4z" />
    </svg>
  ),
  google: (
    <svg viewBox="0 0 512 512" fill="currentColor" height="1.2em" width="1.2em">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-220.7-60.1-60.1L44.2 478.9l60.4 20.1z" />
    </svg>
  ),
};

// --- Helper Components ---

// 1. Reusable Store Button
function StoreButton({
  icon,
  subLabel,
  label,
  href,
}: {
  icon: React.ReactNode;
  subLabel: string;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-black text-white rounded-md px-3 py-2 flex items-center gap-2 hover:bg-black/80 transition w-fit"
    >
      {icon}
      <div className="flex flex-col leading-none">
        <span className="text-[0.6rem] uppercase">{subLabel}</span>
        <span className="text-sm font-semibold">{label}</span>
      </div>
    </Link>
  );
}

// 2. Reusable Link List
function LinkList({
  links,
  external = false,
}: {
  links: LinkType[];
  external?: boolean;
}) {
  return (
    <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
      {links.map((link) => {
        const Icon = link.icon;
        const className =
          "flex items-center gap-2 hover:text-foreground transition-colors";

        if (external) {
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {Icon && <Icon className="h-4 w-4" />} {link.label}
            </a>
          );
        }
        return (
          <Link key={link.label} href={link.href} className={className}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

// --- Main Component ---
export default function Footer() {
  return (
    <footer className="bg-accent/30 border-t py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Clapperboard className="h-6 w-6" />
              <span className="text-xl font-bold">Next Movie</span>
            </div>
            <p className="text-muted-foreground text-sm pr-4">
              Your ultimate destination for discovering your next favorite
              movie.
            </p>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Company</h3>
            <LinkList links={COMPANY_LINKS} />
          </div>

          {/* Column 3: Community */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Community</h3>
            <LinkList links={COMMUNITY_LINKS} external />
          </div>

          {/* Column 4: App Stores */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Get the App</h3>
            <p className="text-sm text-muted-foreground">
              Download our mobile app for on-the-go browsing.
            </p>
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2">
              <StoreButton
                href="#"
                icon={ICONS.apple}
                subLabel="Download on the"
                label="App Store"
              />
              <StoreButton
                href="#"
                icon={ICONS.google}
                subLabel="Get it on"
                label="Google Play"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2026 Next Movie. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
