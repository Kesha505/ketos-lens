import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.footerLogo}>
              <span className={styles.logoIcon}>◉</span>
              <span className={styles.logoText}>
                Ketos<span className={styles.logoAccent}>Lens</span>
              </span>
            </Link>
            <p className={styles.footerDesc}>
              Rental kamera Insta360 profesional. Booking mudah, harga transparan.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerCol}>
              <h4 className={styles.footerColTitle}>Navigasi</h4>
              <Link href="/" className={styles.footerLink}>Beranda</Link>
              <Link href="/booking/x4" className={styles.footerLink}>Booking X4</Link>
              <Link href="/booking/x5" className={styles.footerLink}>Booking X5</Link>
            </div>
            <div className={styles.footerCol}>
              <h4 className={styles.footerColTitle}>Kontak</h4>
              <a href="https://wa.me/6285903685028" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>WhatsApp</a>
              <span className={styles.footerLink}>Bali, Indonesia</span>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} KetosLens. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
