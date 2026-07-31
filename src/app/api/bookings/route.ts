import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*");

  if (error) {
    console.error("[GET /api/bookings]", error.message);
    // Return empty array instead of crashing the page
    return Response.json([]);
  }
  return Response.json(data ?? []);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body tidak valid." }, { status: 400 });
  }

  const {
    camera_id,
    customer_name,
    customer_phone,
    start_date,
    end_date,
    duration_hours,
    total_days,
    total_price,
    notes,
  } = body as Record<string, unknown>;

  if (!camera_id || !customer_name || !customer_phone || !start_date || !end_date) {
    return Response.json({ error: "Semua field wajib diisi." }, { status: 400 });
  }

  // Cek stok kamera
  const { data: camera, error: camErr } = await supabase
    .from("Camera")
    .select("id, stock")
    .eq("id", camera_id)
    .single();

  if (camErr || !camera) {
    console.error("[Camera lookup]", camErr?.message);
    return Response.json({ error: "Kamera tidak ditemukan." }, { status: 404 });
  }

  // Simpan booking — pakai nama kolom minimal yang pasti ada
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      camera_id,
      customer_name,
      customer_phone,
      start_date,
      end_date,
      duration_hours: Number(duration_hours ?? 12),
      total_days: Number(total_days ?? 1),
      total_price: Number(total_price ?? 0),
      notes: notes ?? null,
      status: "pending",
    })
    .select("*")
    .single();

  if (error) {
    console.error("[POST /api/bookings]", error.message, error.details, error.hint);
    return Response.json(
      { error: `Gagal menyimpan booking: ${error.message}` },
      { status: 500 }
    );
  }
  return Response.json(data, { status: 201 });
}
