"use client";

import { useState, useEffect, useCallback } from "react";
import { Camera, Booking } from "@/lib/supabase";
import BookingCalendar from "@/components/BookingCalendar";
import styles from "./BookingForm.module.css";

// ── Nomor WhatsApp Ketos Lens (tanpa +) ──────────────────────────────────────
const KETOS_WA = "6285903685028";

import { useRouter } from "next/navigation";

interface Props {
  cameras: Camera[];
  bookings: Booking[];
  defaultCameraId?: string | number;
  onSuccess: () => void;
}

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function formatDateID(dateStr: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

// Import useRouter inside the component, invoice logic moved to payment page

export default function BookingForm({ cameras, bookings, defaultCameraId, onSuccess }: Props) {
  const [cameraId, setCameraId] = useState<string | number>(defaultCameraId || cameras[0]?.id || "");
  const [duration, setDuration] = useState<"12" | "24">("12");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (defaultCameraId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCameraId(defaultCameraId);
    }
  }, [defaultCameraId]);

  const selectedCamera = cameras.find((c) => String(c.id) === String(cameraId));
  const model = selectedCamera?.model ?? "";

  const totalDays = useCallback(() => {
    if (!startDate || !endDate) return 1;
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.round((e.getTime() - s.getTime()) / 86400000) + 1;
    return Math.max(1, diff);
  }, [startDate, endDate]);

  const days = totalDays();
  const pricePerDay = duration === "12"
    ? (selectedCamera?.price_12h ?? 0)
    : (selectedCamera?.price_24h ?? 0);
  const totalPrice = pricePerDay * days;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !phone.trim() || !startDate) {
      setError("Nama, nomor HP, dan tanggal mulai wajib diisi.");
      return;
    }
    const effectiveEnd = endDate || startDate;
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          camera_id: cameraId,
          customer_name: name.trim(),
          customer_phone: phone.trim(),
          start_date: startDate,
          end_date: effectiveEnd,
          duration_hours: Number(duration),
          total_days: days,
          total_price: totalPrice,
          notes: notes.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan.");
      } else {
        const query = new URLSearchParams({
          model,
          name: name.trim(),
          start: startDate,
          end: effectiveEnd,
          duration,
          days: days.toString(),
          price: totalPrice.toString(),
          notes: notes.trim()
        });
        
        router.push(`/payment?${query.toString()}`);
        setSuccess(true);
        setName(""); setPhone(""); setNotes(""); setStartDate(""); setEndDate("");
        onSuccess();
        setTimeout(() => setSuccess(false), 8000);
      }
    } catch {
      setError("Gagal menghubungi server. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Tanggal yang sudah dipesan untuk kamera ini
  const bookedDates = bookings
    .filter((b) => String(b.camera_id) === String(cameraId) && (b.status === "pending" || b.status === "confirmed"))
    .flatMap((b) => {
      const dates: string[] = [];
      const s = new Date(b.start_date);
      const e = new Date(b.end_date);
      for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        dates.push(d.toISOString().split("T")[0]);
      }
      return dates;
    });

  const today = new Date().toISOString().split("T")[0];

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      {/* Kamera terkunci sesuai section (X4 atau X5) */}
      {selectedCamera && (
        <div className={styles.step}>
          <div className={styles.stepLabel}>
            <span className={styles.stepNum}>1</span>
            Kamera yang Dipilih
          </div>
          <div className={styles.cameraLocked}>
            <span className={styles.camIcon}>◉</span>
            <span className={styles.camName}>Insta360 {selectedCamera.model}</span>
            <span className={styles.camPrice}>
              {formatRupiah(selectedCamera.price_12h)}/12j · {formatRupiah(selectedCamera.price_24h)}/24j
            </span>
          </div>
        </div>
      )}

      {/* Step 2: Duration */}
      <div className={styles.step}>
        <div className={styles.stepLabel}>
          <span className={styles.stepNum}>2</span>
          Durasi Sewa
        </div>
        <div className={styles.durationOptions}>
          {(["12", "24"] as const).map((d) => (
            <button
              type="button"
              key={d}
              className={`${styles.durationBtn} ${duration === d ? styles.durationSelected : ""}`}
              onClick={() => setDuration(d)}
            >
              <span className={styles.durationHours}>{d} Jam</span>
              <span className={styles.durationPrice}>
                {formatRupiah(d === "12" ? (selectedCamera?.price_12h ?? 0) : (selectedCamera?.price_24h ?? 0))}/hari
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 3: Calendar */}
      <div className={styles.step}>
        <div className={styles.stepLabel}>
          <span className={styles.stepNum}>3</span>
          Pilih Tanggal
        </div>
        <BookingCalendar
          bookedDates={bookedDates}
          startDate={startDate}
          endDate={endDate}
          onRangeChange={(s: string, e: string) => { setStartDate(s); setEndDate(e); }}
          minDate={today}
        />
        {/* Auto-filled date fields */}
        <div className={styles.dateFields}>
          <div className={styles.dateField}>
            <label className={styles.dateFieldLabel}>📅 Tanggal Pengambilan</label>
            <div className={`${styles.dateFieldValue} ${startDate ? styles.dateFieldFilled : ""}`}>
              {startDate ? formatDateID(startDate) : "Pilih tanggal di kalender"}
            </div>
          </div>
          <div className={styles.dateField}>
            <label className={styles.dateFieldLabel}>📅 Tanggal Pengembalian</label>
            <div className={`${styles.dateFieldValue} ${(endDate || startDate) ? styles.dateFieldFilled : ""}`}>
              {(endDate || startDate) ? formatDateID(endDate || startDate) : "Pilih tanggal di kalender"}
            </div>
          </div>
        </div>
        {startDate && (
          <div className={styles.daysTag} style={{ alignSelf: "flex-start" }}>
            {days} {days === 1 ? "hari" : "hari"}
          </div>
        )}
      </div>

      {/* Step 4: Price Summary */}
      {startDate && (
        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Kamera</span>
            <span>Insta360 {model}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Durasi</span>
            <span>{duration} jam × {days} hari</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Harga/hari</span>
            <span>{formatRupiah(pricePerDay)}</span>
          </div>
          <div className={styles.divider} />
          <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
            <span>Total</span>
            <span className={styles.totalPrice}>{formatRupiah(totalPrice)}</span>
          </div>
          <div className={styles.summaryRow} style={{ marginTop: "2px" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>DP 50%</span>
            <span style={{ color: "#22d3a0", fontWeight: 700 }}>{formatRupiah(Math.round(totalPrice / 2))}</span>
          </div>
        </div>
      )}

      {/* Step 5: Personal Info */}
      <div className={styles.step}>
        <div className={styles.stepLabel}>
          <span className={styles.stepNum}>4</span>
          Data Diri
        </div>
        <div className={styles.fields}>
          <div className="form-group">
            <label className="form-label">Nama Lengkap</label>
            <input
              className="form-input"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">No. HP / WhatsApp</label>
            <input
              className="form-input"
              type="tel"
              placeholder="08xxxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Catatan (opsional)</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Alamat pengambilan, kebutuhan khusus, dll."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ resize: "vertical" }}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className={styles.errorBox}>
          <span>⚠</span> {error}
        </div>
      )}

      {success && (
        <div className={styles.successBox}>
          <span>✓</span> Booking berhasil! WhatsApp dibuka dengan invoice — kirim pesan ke Ketos Lens untuk konfirmasi.
        </div>
      )}

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? (
          <><span className="spinner" />Memproses...</>
        ) : (
          <>Konfirmasi Booking & Kirim Invoice →</>
        )}
      </button>

      <p className={styles.waNote}>
        💳 Setelah klik tombol, Anda akan diarahkan ke halaman pembayaran.
      </p>
    </form>
  );
}
