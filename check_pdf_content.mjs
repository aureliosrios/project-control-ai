import crypto from 'crypto';

async function check() {
  const url1 = "https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/academia/cert_automation_engineer.pdf";
  const url2 = "https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/academia/cert_automatizacion.pdf";

  console.log("Fetching cert_automation_engineer.pdf...");
  const res1 = await fetch(url1);
  if (res1.status === 200) {
    const buf1 = await res1.arrayBuffer();
    console.log(`✅ cert_automation_engineer.pdf exists (size: ${buf1.byteLength} bytes)`);
  } else {
    console.log(`❌ cert_automation_engineer.pdf failed: ${res1.status} ${res1.statusText}`);
  }

  console.log("Fetching cert_automatizacion.pdf...");
  const res2 = await fetch(url2);
  if (res2.status === 200) {
    const buf2 = await res2.arrayBuffer();
    console.log(`✅ cert_automatizacion.pdf exists (size: ${buf2.byteLength} bytes)`);
  } else {
    console.log(`❌ cert_automatizacion.pdf failed: ${res2.status} ${res2.statusText}`);
  }

  if (hash1 === hash2) {
    console.log("⚠️ WARNING: BOTH PDF FILES ARE EXACTLY IDENTICAL!");
  } else {
    console.log("Files are different.");
  }

  // Let's search for some raw text inside the PDFs
  const text1 = Buffer.from(buf1).toString('utf-8');
  const hasGestion = text1.includes('Gestión') || text1.includes('Gestion');
  const hasAutomation = text1.includes('Automation') || text1.includes('AUTOMATION') || text1.includes('Automatizacion') || text1.includes('automatizacion');
  
  console.log(`cert_automation_engineer.pdf contains 'Gestion/Gestión': ${hasGestion}`);
  console.log(`cert_automation_engineer.pdf contains 'Automation/Automatizacion': ${hasAutomation}`);
}

check();
