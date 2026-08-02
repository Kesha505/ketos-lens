"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import { CreditCard, Banknote, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const KETOS_WA = "6285903685028";

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function formatDateID(dateStr: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const [method, setMethod] = useState<"transfer" | "cash">("transfer");

  const model = searchParams.get("model") || "";
  const name = searchParams.get("name") || "";
  const start = searchParams.get("start") || "";
  const end = searchParams.get("end") || "";
  const price = parseInt(searchParams.get("price") || "0", 10);
  const dp = Math.round(price / 2);
  const notes = searchParams.get("notes") || "";

  const handleConfirm = () => {
    const methodText = method === "transfer" ? "Transfer Bank (BCA)" : "Bayar Tunai (Cash)";
    const invoiceText = 
`📸 FORMULIR BOOKING SEWA INSTA360 ${model} – KETOS LENS

Terima kasih telah mempercayakan kebutuhan dokumentasi Anda kepada Ketos Lens.
Untuk mengamankan jadwal sewa, penyewa wajib melakukan DP sebesar 50%.

Nama Penyewa : ${name}
Tanggal Pengambilan : ${formatDateID(start)}
Tanggal Pengembalian : ${formatDateID(end)}
Unit Kamera : Insta360 ${model}
Metode Pembayaran : ${methodText}
Status Pembayaran : DP 50% / Lunas
Jaminan : ${notes || "-"}

⸻

📋 Syarat & Ketentuan Sewa
✅ Penyewa wajib menyerahkan 2 identitas asli yang masih berlaku sebagai jaminan (KTP/SIM/STNK) dan merupakan milik pribadi.
✅ Penyewa bersedia dilakukan dokumentasi foto saat proses serah terima unit.
✅ Selama masa penyewaan, seluruh tanggung jawab atas kehilangan, kerusakan, maupun kelalaian penggunaan unit menjadi tanggung jawab penuh penyewa.
✅ Waktu pengembalian memiliki toleransi keterlambatan maksimal 1 jam. Apabila melebihi batas tersebut, akan dikenakan denda Rp20.000/jam.
✅ Booking dinyatakan aktif setelah DP diterima.
✅ DP yang sudah dibayarkan tidak dapat dikembalikan (non-refundable) apabila penyewa membatalkan booking pada hari pengambilan atau setelah jadwal sewa telah dikonfirmasi.

${method === "transfer" 
  ? `💳 Informasi Rekening:\nBCA\n4350599741\nA/N DEWA GEDE DHALEM KESHANANDA\n\nTotal DP: ${formatRupiah(dp)}\nTotal Harga: ${formatRupiah(price)}\n\n*Mohon lampirkan bukti transfer di chat ini.*` 
  : `💵 Pembayaran Tunai (Cash)\nSilakan bayar DP sebesar ${formatRupiah(dp)} atau lunas saat pengambilan unit di lokasi.`}`;

    const waUrl = `https://wa.me/${KETOS_WA}?text=${encodeURIComponent(invoiceText)}`;
    window.location.href = waUrl;
  };

  return (
    <div className={styles.paymentContainer}>
      <motion.div 
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={styles.title}>Halaman Pembayaran</h1>
        <p className={styles.subtitle}>Selesaikan pembayaran Anda untuk mengonfirmasi booking.</p>

        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Rincian Pesanan</h2>
          <div className={styles.summaryRow}>
            <span>Kamera</span>
            <span>Insta360 {model}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Total Harga</span>
            <span>{formatRupiah(price)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Total DP (50%)</span>
            <span className={styles.highlight}>{formatRupiah(dp)}</span>
          </div>
        </div>

        <h2 className={styles.summaryTitle} style={{ marginTop: '32px' }}>Metode Pembayaran</h2>
        <div className={styles.methods}>
          <div 
            className={`${styles.methodCard} ${method === "transfer" ? styles.selected : ""}`}
            onClick={() => setMethod("transfer")}
          >
            <CreditCard size={24} className={styles.methodIcon} />
            <div>
              <h3>Transfer Bank</h3>
              <p>BCA</p>
            </div>
            {method === "transfer" && <CheckCircle size={20} className={styles.checkIcon} />}
          </div>

          <div 
            className={`${styles.methodCard} ${method === "cash" ? styles.selected : ""}`}
            onClick={() => setMethod("cash")}
          >
            <Banknote size={24} className={styles.methodIcon} />
            <div>
              <h3>Cash / Tunai</h3>
              <p>Bayar saat pengambilan</p>
            </div>
            {method === "cash" && <CheckCircle size={20} className={styles.checkIcon} />}
          </div>
        </div>

        {method === "transfer" && (
          <div className={styles.bankInfo}>
            <p>Silakan transfer ke rekening berikut:</p>
            <div className={styles.bankDetails}>
              <strong>BCA</strong>
              <span>4350599741</span>
              <span>A/N DEWA GEDE DHALEM KESHANANDA</span>
            </div>
            <p className={styles.note}>Transfer sebesar <strong>{formatRupiah(dp)}</strong> untuk DP.</p>
          </div>
        )}

        {method === "cash" && (
          <div className={styles.bankInfo}>
            <p>Silakan bayar DP sebesar <strong>{formatRupiah(dp)}</strong> atau lunas saat pengambilan unit di lokasi kami.</p>
          </div>
        )}

        <button className="btn-primary" style={{ width: "100%", marginTop: "32px", padding: "16px", justifyContent: "center" }} onClick={handleConfirm}>
          Konfirmasi & Kirim Pesanan via WA
        </button>
      </motion.div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <>
      <Navbar />
      <div className="section" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "120px" }}>
        <Suspense fallback={<div className="spinner" />}>
          <PaymentContent />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
