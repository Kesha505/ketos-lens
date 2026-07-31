"use client";

import styles from "./Navbar.module.css";

export default function Navbar() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◉</span>
          <span className={styles.logoText}>
            Ketos<span className={styles.logoAccent}>Lens</span>
          </span>
        </div>

        <div className={styles.links}>
          <button onClick={() => scrollTo("cameras")} className={styles.link}>Kamera</button>
          <button onClick={() => scrollTo("booking")} className={styles.link}>Booking</button>
          <button onClick={() => scrollTo("pricing")} className={styles.link}>Harga</button>
        </div>

        <button
          onClick={() => scrollTo("booking")}
          className="btn-primary"
          style={{ fontSize: "0.85rem", padding: "10px 22px" }}
        >
          Booking Sekarang
        </button>
      </div>
    </nav>
  );
}
