"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/booking/x4", label: "Insta360 X4" },
  { href: "/booking/x5", label: "Insta360 X5" },
  { href: "/#pricing", label: "Harga" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>◉</span>
          <span className={styles.logoText}>
            Ketos<span className={styles.logoAccent}>Lens</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className={styles.links}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.linkActive : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/booking/x4" className={`btn-primary ${styles.ctaBtn}`}>
          <span>Booking Sekarang</span>
        </Link>

        {/* Mobile Hamburger */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileLinkActive : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking/x4"
            className={`btn-primary ${styles.mobileCta}`}
            onClick={() => setMobileOpen(false)}
          >
            <span>Booking Sekarang</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
