import { createClient } from "@supabase/supabase-js";

// La clave publishable es pública por diseño; la seguridad real depende de las políticas RLS.
// Se puede sobrescribir por entorno (Vercel) sin tocar el código.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bpsumudexpywfffcwpun.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_OzjgZjclmEDlDuVdLGuvQQ_SyX2aTy0";

export const supabase = createClient(supabaseUrl, supabaseKey);
export const STORAGE_URL = `${supabaseUrl}/storage/v1/object/public`;
