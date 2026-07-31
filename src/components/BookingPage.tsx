"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { Camera, Booking } from "@/lib/supabase";
import styles from "./BookingPage.module.css";

interface BookingPageProps {
  model: "X4" | "X5";
}

const MODEL_INFO = {
  X4: {
    fullName: "Insta360 X4",
    tagline: "Kamera 360° Serbaguna",
    description: "Kamera 360° dengan video 8K, foto 72MP, dan tahan air 10 meter. Sempurna untuk vlog, travel, dan dokumentasi event.",
    color: "#3b82f6",
    features: [
      { icon: "📅", title: "Kalender Real-time", desc: "Lihat tanggal yang sudah dipesan untuk X4." },
      { icon: "⚡", title: "Konfirmasi Cepat", desc: "Kami hubungi via WhatsApp dalam 1 jam." },
      { icon: "💳", title: "Harga Transparan", desc: "Total biaya langsung terlihat sebelum submit." },
      { icon: "🔒", title: "Aman & Terpercaya", desc: "Jaminan kualitas dan garansi unit." },
    ],
    specs: [
      "Video 360° 8K30fps",
      "Foto 72MP",
      "FlowState Stabilization",
      "Tahan air 10m",
      "Baterai 2290mAh",
      "MicroSD hingga 1TB",
    ],
  },
  X5: {
    fullName: "Insta360 X5",
    tagline: "Flagship Profesional",
    description: "Sensor lebih besar, AI editing bawaan, dan low-light superior. Pilihan terbaik untuk filmmaker dan konten kreator profesional.",
    color: "#06b6d4",
    features: [
      { icon: "🎥", title: "Video 8K Ultra HD", desc: "Kualitas tertinggi untuk dokumentasi profesional." },
      { icon: "⚡", title: "Konfirmasi Cepat", desc: "Kami hubungi via WhatsApp dalam 1 jam." },
      { icon: "💳", title: "Harga Transparan", desc: "Total biaya langsung terlihat sebelum submit." },
      { icon: "🤖", title: "AI Smart Editing", desc: "Fitur editing otomatis berbasis AI." },
    ],
    specs: [
      "Video 360° 8K+",
      "AI Smart Editing",
      "Sensor Lebih Besar",
      "Tahan air 15m",
      "Low-light Superior",
      "USB-C Fast Charge",
    ],
  },
};

export default function BookingPage({ model }: BookingPageProps) {
  const info = MODEL_INFO[model];
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
    fetchData();
  }, [fetchData]);

  const camera = cameras.find((c) => c.model === model);

  return (
    <>
      <Navbar />

      {/* Page Header */}
      <section className={styles.header}>
        <div className={styles.headerBg}>
          <div className={styles.headerOrb} style={{ background: `radial-gradient(circle, ${info.color}15 0%, transparent 70%)` }} />
        </div>
        <div className={`container ${styles.headerContent}`}>
          <div className={styles.breadcrumb}>
            <a href="/" className={styles.breadcrumbLink}>Beranda</a>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>Booking {info.fullName}</span>
          </div>
          <div className={styles.headerBadge} style={{ borderColor: info.color + "30", background: info.color + "10", color: info.color }}>
            ◉ {info.fullName}
          </div>
          <h1 className={styles.headerTitle}>
            Booking <span className="blue-text">{info.fullName}</span>
          </h1>
          <p className={styles.headerDesc}>{info.description}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.main}>
        <div className="container">
          <div className={styles.layout}>
            {/* Left - Info */}
            <div className={styles.infoCol}>
              {/* Features */}
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>Keuntungan Booking</h3>
                <div className={styles.featuresList}>
                  {info.features.map((f) => (
                    <div key={f.title} className={styles.featureItem}>
                      <span className={styles.featureIcon} style={{ borderColor: info.color + "20", background: info.color + "08" }}>
                        {f.icon}
                      </span>
                      <div>
                        <div className={styles.featureTitle}>{f.title}</div>
                        <div className={styles.featureDesc}>{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>Spesifikasi</h3>
                <div className={styles.specsList}>
                  {info.specs.map((spec) => (
                    <div key={spec} className={styles.specItem}>
                      <span className={styles.specCheck} style={{ color: info.color }}>✓</span>
                      {spec}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Booking Form */}
            <div className={styles.formCol}>
              <div className={styles.formCard}>
                <div className={styles.formCardHeader}>
                  <h2 className={styles.formCardTitle}>Form Booking</h2>
                  <p className={styles.formCardSub}>Isi form di bawah untuk menyewa {info.fullName}</p>
                </div>
                {loading ? (
                  <div className={styles.skeleton} />
                ) : camera ? (
                  <BookingForm
                    cameras={[camera]}
                    bookings={bookings.filter((b) => String(b.camera_id) === String(camera.id))}
                    defaultCameraId={camera.id}
                    onSuccess={fetchData}
                  />
                ) : (
                  <div className={styles.emptyState}>
                    <p>⚠ Data kamera {model} tidak ditemukan.</p>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      Pastikan tabel Camera di Supabase memiliki data dengan model = &quot;{model}&quot;
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
