"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { 
  Camera, 
  Clock, 
  Video, 
  Battery, 
  Droplets, 
  Zap, 
  Edit3, 
  Star,
  CheckCircle,
  MessageCircle
} from "lucide-react";
import { useRef } from "react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className={styles.hero} ref={heroRef}>
        <motion.div 
          className={styles.heroBg}
          style={{ y: yBg, opacity: opacityBg }}
        >
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroGrid} />
        </motion.div>
        
        <motion.div 
          className={`container ${styles.heroContent}`}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={fadeInUp} 
            className={styles.heroLogoWrapper}
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <Image 
              src="/logo.png" 
              alt="Ketos Lens Logo" 
              width={260} 
              height={260} 
              className={styles.heroLogo} 
              priority 
            />
          </motion.div>

          <motion.div variants={fadeInUp} className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Sewa Kamera 360° Profesional
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
            Abadikan Setiap Momen<br />
            Dengan <span className="blue-text">Insta360</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className={styles.heroSub}>
            Rental kamera Insta360 X4 & X5 berkualitas tinggi untuk dokumentasi
            profesional. Booking mudah, harga transparan, tersedia 12 jam & 24 jam.
          </motion.p>
          
          <motion.div variants={fadeInUp} className={styles.heroActions}>
            <Link href="/booking/x4" className="btn-primary">
              <Camera size={18} />
              <span>Booking X4</span>
            </Link>
            <Link href="/booking/x5" className="btn-primary">
              <Camera size={18} />
              <span>Booking X5</span>
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className={styles.heroStats}>
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
          </motion.div>
        </motion.div>
      </section>

      {/* Camera Selection */}
      <section className="section" id="cameras">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="section-label">Pilih Kamera</motion.p>
            <motion.h2 variants={fadeInUp} className="section-title">
              Dua Pilihan <span className="blue-text">Terbaik</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">
              Pilih kamera yang sesuai kebutuhanmu. Klik untuk langsung ke halaman booking.
            </motion.p>

            <motion.div variants={staggerContainer} className={styles.cameraGrid}>
              {/* X4 Card */}
              <motion.div variants={fadeInUp} whileHover={{ y: -8 }}>
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
                      <li><Video size={14} className={styles.featureIcon}/> Video 360° 8K</li>
                      <li><Camera size={14} className={styles.featureIcon}/> Foto 72MP</li>
                      <li><Battery size={14} className={styles.featureIcon}/> Baterai awet</li>
                    </ul>
                    <div className={styles.cameraPrices}>
                      <div className={styles.cameraPrice}>
                        <span className={styles.priceDur}>12 Jam</span>
                        <span className={styles.priceVal}>Rp 120k</span>
                      </div>
                      <div className={styles.cameraPriceDivider} />
                      <div className={styles.cameraPrice}>
                        <span className={styles.priceDur}>24 Jam</span>
                        <span className={styles.priceVal}>Rp 180k</span>
                      </div>
                    </div>
                    <div className={styles.cameraAction}>
                      Booking Sekarang →
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* X5 Card */}
              <motion.div variants={fadeInUp} whileHover={{ y: -8 }}>
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
                      <li><Zap size={14} className={styles.featureIcon}/> Video 360° 8K+</li>
                      <li><Edit3 size={14} className={styles.featureIcon}/> AI Editing</li>
                      <li><Star size={14} className={styles.featureIcon}/> Low-light pro</li>
                    </ul>
                    <div className={styles.cameraPrices}>
                      <div className={styles.cameraPrice}>
                        <span className={styles.priceDur}>12 Jam</span>
                        <span className={styles.priceVal}>Rp 150k</span>
                      </div>
                      <div className={styles.cameraPriceDivider} />
                      <div className={styles.cameraPrice}>
                        <span className={styles.priceDur}>24 Jam</span>
                        <span className={styles.priceVal}>Rp 230k</span>
                      </div>
                    </div>
                    <div className={styles.cameraAction}>
                      Booking Sekarang →
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" id="pricing">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="section-label">Harga Transparan</motion.p>
            <motion.h2 variants={fadeInUp} className="section-title">
              Tarif <span className="blue-text">Sewa</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="section-subtitle">
              Tanpa biaya tersembunyi. Harga sudah termasuk memory card dan aksesoris standar.
            </motion.p>

            <motion.div variants={staggerContainer} className={styles.pricingGrid}>
              {[
                { model: "Insta360 X4", h12: 120000, h24: 180000, color: "#3b82f6", href: "/booking/x4" },
                { model: "Insta360 X5", h12: 150000, h24: 230000, color: "#06b6d4", href: "/booking/x5" },
              ].map((p) => (
                <motion.div key={p.model} variants={fadeInUp} whileHover={{ scale: 1.02 }} className={styles.pricingCard}>
                  <div className={styles.pricingHeader} style={{ borderColor: p.color + "20" }}>
                    <div className={styles.pricingIcon} style={{ color: p.color }}>
                      <Camera size={24} />
                    </div>
                    <h3 className={styles.pricingModel}>{p.model}</h3>
                  </div>
                  <div className={styles.pricingRows}>
                    <div className={styles.pricingRow}>
                      <div className={styles.pricingDuration}>
                        <Clock size={18} className={styles.clockIcon} style={{ color: p.color }} />
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
                        <Star size={18} className={styles.clockIcon} style={{ color: p.color }} />
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
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="section-label">Cara Kerja</motion.p>
            <motion.h2 variants={fadeInUp} className="section-title">
              Mudah & <span className="blue-text">Cepat</span>
            </motion.h2>
            <motion.div variants={staggerContainer} className={styles.stepsGrid}>
              {[
                { num: "01", title: "Pilih Kamera", desc: "Pilih Insta360 X4 atau X5 sesuai kebutuhan dokumentasimu.", icon: Camera },
                { num: "02", title: "Isi Form Booking", desc: "Pilih tanggal, durasi, dan isi data diri. Harga langsung terlihat.", icon: Edit3 },
                { num: "03", title: "Konfirmasi", desc: "Invoice otomatis terkirim ke WhatsApp. Bayar DP untuk konfirmasi.", icon: MessageCircle },
                { num: "04", title: "Ambil & Gunakan", desc: "Ambil kamera sesuai jadwal. Abadikan momen terbaikmu!", icon: CheckCircle },
              ].map((step) => {
                const Icon = step.icon;
                return (
                  <motion.div key={step.num} variants={fadeInUp} whileHover={{ y: -5 }} className={styles.stepCard}>
                    <div className={styles.stepNum}>{step.num}</div>
                    <div className={styles.stepIconWrap}>
                      <Icon size={26} className={styles.stepIcon} />
                    </div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

