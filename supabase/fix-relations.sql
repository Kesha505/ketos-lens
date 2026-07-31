-- ===================================================
-- Ketos Lens — Perbaikan Relasi Database
-- Run this in your Supabase SQL Editor
-- ===================================================

-- 1. Hapus tabel bookings yang lama (yang tidak ada relasinya)
drop table if exists public.bookings;

-- 2. Buat ulang tabel bookings dengan relasi (FOREIGN KEY) yang benar ke tabel Camera
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  -- "int8" sesuai dengan tipe id di tabel Camera milikmu
  camera_id int8 not null references public."Camera"(id),
  customer_name text not null,
  customer_phone text not null,
  start_date date not null,
  end_date date not null,
  duration_hours int not null check (duration_hours in (12, 24)),
  total_days int not null default 1,
  total_price int not null,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled','completed')),
  notes text,
  created_at timestamptz default now()
);

-- 3. Aktifkan kembali Security (RLS)
alter table public.bookings enable row level security;
create policy "Public read bookings" on public.bookings for select using (true);
create policy "Public insert bookings" on public.bookings for insert with check (true);

-- API Supabase perlu merefresh cache schema-nya
NOTIFY pgrst, 'reload schema';
