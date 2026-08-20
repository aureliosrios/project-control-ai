async function run() {
  const url = "https://project-control-ai-one.vercel.app/formacion";
  console.log(`🔍 Fetching live URL: ${url}`);
  try {
    const res = await fetch(url);
    const html = await res.text();
    
    // Check main HTML first
    let hasNewDate = html.includes("23 de Agosto") || html.includes("23/08");
    let hasOldDate = html.includes("16 de Agosto") || html.includes("16/08");
    
    if (!hasNewDate && !hasOldDate) {
      // Find chunks
      const chunkRegex = /\/_next\/static\/chunks\/[^"']+\.js/g;
      const chunks = html.match(chunkRegex) || [];
      console.log(`Found ${chunks.length} JS chunks. Searching inside chunks...`);
      
      for (const chunk of chunks) {
        const chunkUrl = `https://project-control-ai-one.vercel.app${chunk}`;
        const chunkRes = await fetch(chunkUrl);
        const chunkText = await chunkRes.text();
        
        if (chunkText.includes("23 de Agosto") || chunkText.includes("23/08")) {
          hasNewDate = true;
          console.log(`- Encontrado "23 de Agosto" en chunk: ${chunk}`);
          break;
        }
        if (chunkText.includes("16 de Agosto") || chunkText.includes("16/08")) {
          hasOldDate = true;
          console.log(`- Encontrado "16 de Agosto" en chunk: ${chunk}`);
          break;
        }
      }
    }
    
    console.log(`- Contiene "23 de Agosto": ${hasNewDate ? "✅ SÍ" : "❌ NO"}`);
    console.log(`- Contiene "16 de Agosto": ${hasOldDate ? "⚠️ SÍ" : "✅ NO"}`);
    
    if (hasNewDate) {
      console.log("\n🎉 [DESPLEGADO] El nuevo despliegue con la fecha del 23 de Agosto ya está activo en Vercel!");
    } else if (hasOldDate) {
      console.log("\n⏳ [ESPERANDO] Vercel todavía está sirviendo la versión anterior (16 de Agosto).");
    } else {
      console.log("\n⏳ [ESPERANDO] Vercel está construyendo y desplegando el nuevo commit...");
    }
  } catch (err) {
    console.error("❌ Error verificando el despliegue:", err);
  }
}

run();
