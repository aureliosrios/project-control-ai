

async function check() {
  const url = "https://project-control-ai-one.vercel.app/verificar";
  console.log(`Fetching HTML from ${url}...`);
  const res = await fetch(url);
  const html = await res.text();
  
  // Find all JS chunks in the HTML
  const regex = /\/_next\/static\/chunks\/[\w\-]+\.js/g;
  const chunks = html.match(regex) || [];
  
  // Also check pages chunks
  const regexPages = /\/_next\/static\/chunks\/app\/verificar\/page\-[\w\-]+\.js/g;
  const pagesChunks = html.match(regexPages) || [];
  
  const allChunks = [...new Set([...chunks, ...pagesChunks])];
  console.log(`Found chunks:`, allChunks);
  
  let found = false;
  for (const chunk of allChunks) {
    const chunkUrl = `https://project-control-ai-one.vercel.app${chunk}`;
    const chunkRes = await fetch(chunkUrl);
    const chunkJs = await chunkRes.text();
    if (chunkJs.includes("cert_automatizacion")) {
      console.log(`✅ FOUND cert_automatizacion in chunk: ${chunk}`);
      found = true;
    }
    if (chunkJs.includes("cert_automation_engineer")) {
      console.log(`⚠️ FOUND cert_automation_engineer in chunk: ${chunk}`);
    }
    if (chunkJs.includes("cert_gestion_integral")) {
      console.log(`ℹ️ Chunk ${chunk} references cert_gestion_integral`);
    }
  }
  
  if (!found) {
    console.log("❌ The string 'cert_automatizacion' was NOT found in any of the verified chunks on Vercel.");
  }
}

check();
