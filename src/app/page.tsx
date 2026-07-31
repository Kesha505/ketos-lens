"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroGrid} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Sewa Kamera 360° Profesional
          </div>
          <h1 className={styles.heroTitle}>
            Abadikan Setiap Momen<br />
            Dengan <span className="blue-text">Insta360</span>
          </h1>
          <p className={styles.heroSub}>
            Rental kamera Insta360 X4 & X5 berkualitas tinggi untuk dokumentasi
            profesional. Booking mudah, harga transparan, tersedia 12 jam & 24 jam.
          </p>
          <div className={styles.heroActions}>
            <Link href="/booking/x4" className="btn-primary">
              <span>Booking X4</span>
            </Link>
            <Link href="/booking/x5" className="btn-ghost">
              Booking X5
            </Link>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>2</span>
              <span className={styles.heroStatLabel}>Model Kamera</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>12 & 24</span>
              <span className={styles.heroStatLabel}>Jam Tersedia</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>8K</span>
              <span className={styles.heroStatLabel}>Resolusi Video</span>
            </div>
          </div>
        </div>
      </section>

      {/* Camera Selection */}
      <section className="section" id="cameras">
        <div className="container">
          <p className="section-label">Pilih Kamera</p>
          <h2 className="section-title">
            Dua Pilihan <span className="blue-text">Terbaik</span>
          </h2>
          <p className="section-subtitle">
            Pilih kamera yang sesuai kebutuhanmu. Klik untuk langsung ke halaman booking.
          </p>

          <div className={styles.cameraGrid}>
            {/* X4 Card */}
            <Link href="/booking/x4" className={styles.cameraCard}>
              <div className={styles.cameraCardGlow} />
              <div className={styles.cameraCardInner}>
                <div className={styles.cameraHeader}>
                  <span className={`${styles.cameraBadge} ${styles.badgeX4}`}>X4</span>
                  <span className={styles.cameraAvail}>
                    <span className={styles.availDot} />
                    Tersedia
                  </span>
                </div>
                <h3 className={styles.cameraName}>Insta360 X4</h3>
                <p className={styles.cameraDesc}>
                  Kamera 360° serbaguna untuk vlog, dokumentasi, dan konten kreator.
                  Video 8K dengan stabilisasi terbaik.
                </p>
                <ul className={styles.cameraFeatures}>
                  <li>🎬 Video 360° 8K</li>
                  <li>📸 Foto 72MP</li>
                  <li>🔋 Baterai tahan lama</li>
                  <li>💧 Tahan air 10m</li>
                </ul>
                <div className={styles.cameraPrices}>
                  <div className={styles.cameraPrice}>
                    <span className={styles.priceDur}>12 Jam</span>
                    <span className={styles.priceVal}>Rp 120.000</span>
                  </div>
                  <div className={styles.cameraPriceDivider} />
                  <div className={styles.cameraPrice}>
                    <span className={styles.priceDur}>24 Jam</span>
                    <span className={styles.priceVal}>Rp 180.000</span>
                  </div>
                </div>
                <div className={styles.cameraAction}>
                  Booking Sekarang →
                </div>
              </div>
            </Link>

            {/* X5 Card */}
            <Link href="/booking/x5" className={styles.cameraCard}>
              <div className={`${styles.cameraCardGlow} ${styles.cameraCardGlowX5}`} />
              <div className={styles.cameraCardInner}>
                <div className={styles.cameraHeader}>
                  <span className={`${styles.cameraBadge} ${styles.badgeX5}`}>X5</span>
                  <span className={styles.cameraAvail}>
                    <span className={styles.availDot} />
                    Tersedia
                  </span>
                </div>
                <h3 className={styles.cameraName}>Insta360 X5</h3>
                <p className={styles.cameraDesc}>
                  Flagship terbaru dengan sensor lebih besar, AI editing, dan kualitas
                  profesional untuk filmmaker.
                </p>
                <ul className={styles.cameraFeatures}>
                  <li>🎬 Video 360° 8K+</li>
                  <li>🤖 AI Smart Editing</li>
                  <li>🌟 Low-light Superior</li>
                  <li>💧 Tahan air 15m</li>
                </ul>
                <div className={styles.cameraPrices}>
                  <div className={styles.cameraPrice}>
                    <span className={styles.priceDur}>12 Jam</span>
                    <span className={styles.priceVal}>Rp 150.000</span>
                  </div>
                  <div className={styles.cameraPriceDivider} />
                  <div className={styles.cameraPrice}>
                    <span className={styles.priceDur}>24 Jam</span>
                    <span className={styles.priceVal}>Rp 230.000</span>
                  </div>
                </div>
                <div className={styles.cameraAction}>
                  Booking Sekarang →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" id="pricing">
        <div className="container">
          <p className="section-label">Harga Transparan</p>
          <h2 className="section-title">
            Tarif <span className="blue-text">Sewa</span>
          </h2>
          <p className="section-subtitle">
            Tanpa biaya tersembunyi. Harga sudah termasuk memory card dan aksesoris standar.
          </p>

          <div className={styles.pricingGrid}>
            {[
              { model: "Insta360 X4", h12: 120000, h24: 180000, color: "#3b82f6", href: "/booking/x4" },
              { model: "Insta360 X5", h12: 150000, h24: 230000, color: "#06b6d4", href: "/booking/x5" },
            ].map((p) => (
              <div key={p.model} className={styles.pricingCard}>
                <div className={styles.pricingHeader} style={{ borderColor: p.color + "20" }}>
                  <div className={styles.pricingIcon} style={{ color: p.color }}>◉</div>
                  <h3 className={styles.pricingModel}>{p.model}</h3>
                </div>
                <div className={styles.pricingRows}>
                  <div className={styles.pricingRow}>
                    <div className={styles.pricingDuration}>
                      <span className={styles.clockIcon}>⏱</span>
                      <div>
                        <div className={styles.pricingDurLabel}>12 Jam</div>
                        <div className={styles.pricingDurSub}>Sewa harian singkat</div>
                      </div>
                    </div>
                    <div className={styles.pricingAmount} style={{ color: p.color }}>
                      Rp {p.h12.toLocaleString("id-ID")}
                      <span className={styles.pricingPer}>/hari</span>
                    </div>
                  </div>
                  <div className={styles.pricingRow}>
                    <div className={styles.pricingDuration}>
                      <span className={styles.clockIcon}>🌙</span>
                      <div>
                        <div className={styles.pricingDurLabel}>24 Jam</div>
                        <div className={styles.pricingDurSub}>Sewa sehari penuh</div>
                      </div>
                    </div>
                    <div className={styles.pricingAmount} style={{ color: p.color }}>
                      Rp {p.h24.toLocaleString("id-ID")}
                      <span className={styles.pricingPer}>/hari</span>
                    </div>
                  </div>
                </div>
                <Link href={p.href} className={styles.pricingCta}>
                  Booking {p.model.split(" ")[1]} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <p className="section-label">Cara Kerja</p>
          <h2 className="section-title">
            Mudah & <span className="blue-text">Cepat</span>
          </h2>
          <div className={styles.stepsGrid}>
            {[
              { num: "01", title: "Pilih Kamera", desc: "Pilih Insta360 X4 atau X5 sesuai kebutuhan dokumentasimu.", icon: "📷" },
              { num: "02", title: "Isi Form Booking", desc: "Pilih tanggal, durasi, dan isi data diri. Harga langsung terlihat.", icon: "📝" },
              { num: "03", title: "Konfirmasi via WhatsApp", desc: "Invoice otomatis terkirim ke WhatsApp. Bayar DP 50% untuk konfirmasi.", icon: "📲" },
              { num: "04", title: "Ambil & Gunakan", desc: "Ambil kamera sesuai jadwal. Abadikan momen terbaikmu!", icon: "🎬" },
            ].map((step) => (
              <div key={step.num} className={styles.stepCard}>
                <div className={styles.stepNum}>{step.num}</div>
                <span className={styles.stepIcon}>{step.icon}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
