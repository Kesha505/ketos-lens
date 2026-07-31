import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type CameraModel = "X4" | "X5";
export type Duration = "12" | "24";

export interface Camera {
  id: string;
  model: CameraModel;
  total_stock: number;
  price_12h: number;
  price_24h: number;
  description: string;
}

export interface Booking {
  id: string;
  camera_id: string;
  customer_name: string;
  customer_phone: string;
  start_date: string;
  end_date: string;
  duration_hours: number;
  total_days: number;
  total_price: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes: string | null;
  created_at: string;
}

export interface BookingWithCamera extends Booking {
  cameras: Camera;
}