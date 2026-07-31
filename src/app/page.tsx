"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import CameraCard from "@/components/CameraCard";
import BookingForm from "@/components/BookingForm";
import { Camera, Booking } from "@/lib/supabase";
import styles from "./page.module.css";

export default function Home() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [camRes, bkRes] = await Promise.all([
        fetch("/api/cameras"),
        fetch("/api/bookings"),
      ]);
      const [camData, bkData] = await Promise.all([camRes.json(), bkRes.json()]);
      if (Array.isArray(camData)) setCameras(camData);
      if (Array.isArray(bkData)) setBookings(bkData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  const scrollToBooking = (model: string) => {
    document.getElementById(`booking-${model}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cameraX4 = cameras.find((c) => c.model === "X4");
  const cameraX5 = cameras.find((c) => c.model === "X5");

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Sewa Kamera 360° Profesional
          </div>
          <h1 className={styles.heroTitle}>
            Abadikan Moment Terbaikmu Dengan<br />
            <span className="gold-text">Insta360</span>
          </h1>
          <p className={styles.heroSub}>
            Rental kamera Insta360 X4 & X5 berkualitas tinggi. Booking mudah,
            harga transparan, tersedia 12 jam & 24 jam.
          </p>
          <div className={styles.heroActions}>
            <button
              className="btn-primary"
              onClick={() => document.getElementById("cameras")?.scrollIntoView({ behavior: "smooth" })}
            >
              Booking Sekarang ↓
            </button>
            <button
              className="btn-ghost"
              onClick={() => document.getElementById("cameras")?.scrollIntoView({ behavior: "smooth" })}
            >
              Lihat Kamera
            </button>
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
              <span className={styles.heroStatNum}>360°</span>
              <span className={styles.heroStatLabel}>Video Kualitas 8K</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cameras Section */}
      <section className="section" id="cameras">
        <div className="container">
          <p className="section-label">Armada Kami</p>
          <h2 className="section-title">
            Pilih <span className="gold-text">Kamera</span> Mu
          </h2>
          <p className="section-subtitle">
            Harga langsung terlihat. Klik tombol booking untuk langsung mengisi
            form pemesanan di kamera yang kamu pilih.
          </p>

          <div className={styles.cameraGrid}>
            {loading ? (
              <>
                <div className={styles.skeletonCard} />
                <div className={styles.skeletonCard} />
              </>
            ) : cameras.length === 0 ? (
              <div className={styles.empty}>
                <p>⚠ Tidak ada data kamera. Pastikan Supabase terhubung.</p>
              </div>
            ) : (
              cameras.map((cam) => (
                <CameraCard
                  key={cam.id}
                  camera={cam}
                  onBook={() => scrollToBooking(cam.model)}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section" id="pricing" style={{ paddingTop: 0 }}>
        <div className="container">
          <p className="section-label">Harga Transparan</p>
          <h2 className="section-title">
            Tarif <span className="gold-text">Sewa</span>
          </h2>
          <div className={styles.pricingGrid}>
            {[
              { model: "Insta360 X4", h12: 120000, h24: 180000, accent: "#c9a84c" },
              { model: "Insta360 X5", h12: 150000, h24: 230000, accent: "#7c6af0" },
            ].map((p) => (
              <div key={p.model} className={styles.pricingCard}>
                <div className={styles.pricingHeader} style={{ borderColor: p.accent + "30" }}>
                  <div className={styles.pricingIcon} style={{ color: p.accent }}>◉</div>
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
                    <div className={styles.pricingAmount} style={{ color: p.accent }}>
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
                    <div className={styles.pricingAmount} style={{ color: p.accent }}>
                      Rp {p.h24.toLocaleString("id-ID")}
                      <span className={styles.pricingPer}>/hari</span>
                    </div>
                  </div>
                </div>
                <div className={styles.pricingNote}>
                  💡 Harga otomatis dikalikan jumlah hari yang dipilih
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Booking X4 ===== */}
      <section className="section" id="booking-X4" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className={styles.bookingSectionHeader}>
            <span className={styles.bookingCameraTag} style={{ borderColor: "#c9a84c44", background: "#c9a84c18", color: "#c9a84c" }}>
              ◉ Insta360 X4
            </span>
            <h2 className={`section-title ${styles.bookingTitle}`}>
              Booking <span style={{ color: "#c9a84c" }}>X4</span>
            </h2>
            <p className="section-subtitle">
              Isi form di bawah untuk menyewa Insta360 X4. Pilih tanggal di kalender dan konfirmasi pemesananmu.
            </p>
          </div>
          <div className={styles.bookingLayout}>
            <div className={styles.bookingLeft}>
              <div className={styles.bookingFeatures}>
                {[
                  { icon: "📅", title: "Kalender Real-time", desc: "Lihat tanggal yang sudah dipesan untuk X4." },
                  { icon: "⚡", title: "Konfirmasi Cepat", desc: "Kami hubungi via WhatsApp dalam 1 jam." },
                  { icon: "💳", title: "Harga Transparan", desc: "Total biaya langsung terlihat sebelum submit." },
                ].map((f) => (
                  <div key={f.title} className={styles.bookingFeature}>
                    <span className={styles.featureIcon}>{f.icon}</span>
                    <div>
                      <div className={styles.featureTitle}>{f.title}</div>
                      <div className={styles.featureDesc}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.bookingRight}>
              {loading ? (
                <div className={styles.skeletonForm} />
              ) : cameraX4 ? (
                <BookingForm
                  cameras={[cameraX4]}
                  bookings={bookings.filter((b) => String(b.camera_id) === String(cameraX4.id))}
                  defaultCameraId={cameraX4.id}
                  onSuccess={fetchData}
                />
              ) : (
                <p style={{ color: "var(--text-muted)" }}>Data kamera X4 tidak ditemukan.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Booking X5 ===== */}
      <section className="section" id="booking-X5" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className={styles.bookingSectionHeader}>
            <span className={styles.bookingCameraTag} style={{ borderColor: "#7c6af044", background: "#7c6af018", color: "#7c6af0" }}>
              ◉ Insta360 X5
            </span>
            <h2 className={`section-title ${styles.bookingTitle}`}>
              Booking <span style={{ color: "#7c6af0" }}>X5</span>
            </h2>
            <p className="section-subtitle">
              Isi form di bawah untuk menyewa Insta360 X5. Pilih tanggal di kalender dan konfirmasi pemesananmu.
            </p>
          </div>
          <div className={styles.bookingLayout}>
            <div className={styles.bookingLeft}>
              <div className={styles.bookingFeatures}>
                {[
                  { icon: "🎥", title: "Video 8K Ultra HD", desc: "Kualitas tertinggi untuk dokumentasi profesional." },
                  { icon: "⚡", title: "Konfirmasi Cepat", desc: "Kami hubungi via WhatsApp dalam 1 jam." },
                  { icon: "💳", title: "Harga Transparan", desc: "Total biaya langsung terlihat sebelum submit." },
                ].map((f) => (
                  <div key={f.title} className={styles.bookingFeature}>
                    <span className={styles.featureIcon}>{f.icon}</span>
                    <div>
                      <div className={styles.featureTitle}>{f.title}</div>
                      <div className={styles.featureDesc}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.bookingRight}>
              {loading ? (
                <div className={styles.skeletonForm} />
              ) : cameraX5 ? (
                <BookingForm
                  cameras={[cameraX5]}
                  bookings={bookings.filter((b) => String(b.camera_id) === String(cameraX5.id))}
                  defaultCameraId={cameraX5.id}
                  onSuccess={fetchData}
                />
              ) : (
                <p style={{ color: "var(--text-muted)" }}>Data kamera X5 tidak ditemukan.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <div className={styles.footerLogo}>
              <span style={{ color: "#c9a84c", fontSize: "1.2rem" }}>◉</span>
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800 }}>
                Ketos<span style={{ color: "#c9a84c" }}>Lens</span>
              </span>
            </div>
            <p className={styles.footerText}>
              Rental Kamera Insta360 Profesional · {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
