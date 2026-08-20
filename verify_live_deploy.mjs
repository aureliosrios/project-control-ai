async function run() {
  const url = "https://project-control-ai-one.vercel.app/formacion";
  console.log(`🔍 Fetching live URL: ${url}`);
  try {
    const res = await fetch(url);
    const text = await res.text();
    
    // Check if the page has "23 de Agosto"
    const hasNewDate = text.includes("23 de Agosto") || text.includes("23/08");
    const hasOldDate = text.includes("16 de Agosto") || text.includes("16/08");
    
    console.log(`- Contiene "23 de Agosto" / "23/08": ${hasNewDate ? "✅ SÍ" : "❌ NO"}`);
    console.log(`- Contiene "16 de Agosto" / "16/08": ${hasOldDate ? "⚠️ SÍ" : "✅ NO"}`);
    
    if (hasNewDate && !hasOldDate) {
      console.log("\n🎉 [DESPLEGADO] El nuevo despliegue con la fecha del 23 de Agosto ya está activo en Vercel!");
    } else {
      console.log("\n⏳ [ESPERANDO] Vercel todavía está procesando el build o sirviendo la versión caché anterior.");
    }
  } catch (err) {
    console.error("❌ Error verificando el despliegue:", err);
  }
}

run();
