import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ketos Lens — Rental Kamera Insta360 Profesional",
  description:
    "Sewa kamera Insta360 X4 dan X5 dengan mudah. Booking online, stok real-time, harga transparan. Tersedia sewa 12 jam & 24 jam.",
  keywords: "rental kamera insta360, sewa kamera 360, insta360 x4, insta360 x5, ketos lens",
  openGraph: {
    title: "Ketos Lens — Rental Kamera Insta360",
    description: "Sewa kamera Insta360 X4 & X5. Booking mudah, harga transparan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
