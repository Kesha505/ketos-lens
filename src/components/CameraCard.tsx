"use client";

import { Camera } from "@/lib/supabase";
import styles from "./CameraCard.module.css";

interface Props {
  camera: Camera;
  onBook: () => void;
}

export default function CameraCard({ camera, onBook }: Props) {
  const modelLabel = `Insta360 ${camera.model}`;
  const modelColor = camera.model === "X5" ? "#7c6af0" : "#c9a84c";

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div
          className={styles.modelBadge}
          style={{ borderColor: modelColor + "44", background: modelColor + "18" }}
        >
          <span style={{ color: modelColor }}>◉</span>
          <span style={{ color: modelColor }}>{modelLabel}</span>
        </div>
        <div className={styles.statusAvail}>
          <span className={styles.dot} style={{ background: "#22d3a0" }} />
          Tersedia
        </div>
      </div>

      <h3 className={styles.title}>{modelLabel}</h3>
      <p className={styles.desc}>
        {camera.description ||
          `Kamera 360° ${modelLabel} siap disewa untuk dokumentasi profesional.`}
      </p>

      <div className={styles.prices}>
        <div className={styles.priceItem}>
          <span className={styles.priceLabel}>12 Jam</span>
          <span className={styles.priceVal}>
            Rp {camera.price_12h.toLocaleString("id-ID")}
          </span>
        </div>
        <div className={styles.priceDivider} />
        <div className={styles.priceItem}>
          <span className={styles.priceLabel}>24 Jam</span>
          <span className={styles.priceVal}>
            Rp {camera.price_24h.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      <button
        className={styles.bookBtn}
        onClick={onBook}
      >
        Booking Kamera Ini
      </button>
    </div>
  );
}
