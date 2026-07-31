import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("Camera")           // capital C — matches your Supabase table name
    .select("*")
    .order("model", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
