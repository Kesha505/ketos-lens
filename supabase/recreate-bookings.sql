-- =====================================================
-- JALANKAN INI DI SUPABASE SQL EDITOR
-- Ini akan hapus tabel bookings lama & buat yang baru
-- =====================================================

-- Step 1: Hapus tabel bookings yang ada
DROP TABLE IF EXISTS public.bookings CASCADE;

-- Step 2: Buat tabel bookings baru dengan kolom yang benar
CREATE TABLE public.bookings (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  camera_id   int8 NOT NULL,
  customer_name   text NOT NULL,
  customer_phone  text NOT NULL,
  start_date  date NOT NULL,
  end_date    date NOT NULL,
  duration_hours  int  NOT NULL DEFAULT 12,
  total_days  int  NOT NULL DEFAULT 1,
  total_price int  NOT NULL DEFAULT 0,
  status      text NOT NULL DEFAULT 'pending',
  notes       text,
  created_at  timestamptz DEFAULT now()
);

-- Step 3: Aktifkan RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Step 4: Policy agar bisa dibaca & diisi publik
CREATE POLICY "allow select bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "allow insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);

-- Done!
SELECT 'Tabel bookings berhasil dibuat!' as result;
