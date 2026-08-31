"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/papers", label: "证明" },
  { href: "/path", label: "路径" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "site-header",
        home && "site-header-home",
        scrolled && "is-scrolled",
      )}
    >
      <Link href="/" className="brand-mark">
        针迹
      </Link>
      <nav className="site-nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "nav-link",
              pathname.startsWith(link.href) && "is-active",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
