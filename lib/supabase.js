import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bpsumudexpywfffcwpun.supabase.co";
const supabaseKey = "sb_publishable_OzjgZjclmEDlDuVdLGuvQQ_SyX2aTy0";

export const supabase = createClient(supabaseUrl, supabaseKey);
