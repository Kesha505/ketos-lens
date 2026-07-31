-- ===================================================
-- Ketos Lens — Insert Camera Data
-- Run this in your Supabase SQL Editor
-- (Your Camera table already exists, just insert data)
-- ===================================================

-- Insert Insta360 X4
insert into public."Camera" (model, stock, price_12h, price_24h)
values
  ('X4', 1, 120000, 180000),
  ('X5', 1, 150000, 230000)
on conflict do nothing;

-- ===================================================
-- Setup bookings table (if not exists yet)
-- ===================================================

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  camera_id uuid not null,
  customer_name text not null,
  customer_phone text not null,
  start_date date not null,
  end_date date not null,
  duration_hours int not null check (duration_hours in (12, 24)),
  total_days int not null default 1,
  total_price int not null,
  status text not null default 'pending'
    check (status in ('pending','confirmed','cancelled','completed')),
  notes text,
  created_at timestamptz default now()
);

-- ===================================================
-- Enable RLS (if not already enabled)
-- ===================================================

alter table public."Camera" enable row level security;
alter table public.bookings enable row level security;

-- Allow public to read cameras
do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'Camera' and policyname = 'Public read cameras'
  ) then
    execute 'create policy "Public read cameras" on public."Camera" for select using (true)';
  end if;
end $$;

-- Allow public to read & insert bookings
do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'bookings' and policyname = 'Public read bookings'
  ) then
    execute 'create policy "Public read bookings" on public.bookings for select using (true)';
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'bookings' and policyname = 'Public insert bookings'
  ) then
    execute 'create policy "Public insert bookings" on public.bookings for insert with check (true)';
  end if;
end $$;

-- Done ✓
