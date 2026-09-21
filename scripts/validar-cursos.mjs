import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

export function validarCatalogo(catalogo, publicDir = path.join(root, 'public')) {
  const errores = [];
  const avisos = [];
  const ids = new Set();
  const registros = new Set();
  const check = (ok, message) => { if (!ok) errores.push(message); };
  const local = (url, id) => {
    const archivo = path.resolve(publicDir, '.' + url);
    const relativo = path.relative(publicDir, archivo);
    const seguro = !relativo.startsWith('..') && !path.isAbsolute(relativo);
    check(seguro && fs.existsSync(archivo) && fs.statSync(archivo).isFile(), `${id}: archivo local ausente o inválido: ${url}`);
    if (seguro && /\.(jpe?g|png|webp|avif)$/i.test(archivo) && fs.existsSync(archivo) && fs.statSync(archivo).size > 1024 * 1024) avisos.push(`${id}: ${url} supera 1 MB; servir con next/image y sizes, revisar legibilidad antes de comprimir.`);
  };
  const enlace = (valor, id, campo) => {
    if (typeof valor !== 'string' || !valor.trim()) return check(false, `${id}: falta ${campo}`);
    if (valor.startsWith('/') && !valor.startsWith('//')) {
      if (campo === 'imagen' || campo === 'brochure') local(valor, id);
      else check(valor === '/inscripcion', `${id}: ruta de inscripción no reconocida`);
      return;
    }
    try { check(new URL(valor).protocol === 'https:', `${id}: ${campo} debe usar HTTPS`); }
    catch { check(false, `${id}: ${campo} no es una URL válida`); }
  };
  for (const grupo of ['asincronicos', 'sincronicos']) {
    check(Array.isArray(catalogo?.[grupo]), `Falta el listado ${grupo}`);
    if (!Array.isArray(catalogo?.[grupo])) continue;
    for (const curso of catalogo[grupo]) {
      if (!curso || typeof curso !== 'object') { check(false, `${grupo}: curso inválido`); continue; }
      const id = curso.id || '(sin ID)';
      check(typeof curso.id === 'string' && /^[A-Z][0-9]+$/.test(curso.id), `${id}: ID inválido`);
      check(!ids.has(id), `${id}: ID duplicado`); ids.add(id);
      for (const campo of ['nombre', 'precio', 'tag']) check(typeof curso[campo] === 'string' && !!curso[campo].trim(), `${id}: falta ${campo}`);
      check(/^\$\d+(\.\d{2})? USD$/.test(curso.precio), `${id}: precio esperado en formato $15.99 USD`);
      enlace(curso.link, id, 'link');
      if (grupo === 'asincronicos') {
        check(['A', 'B', 'C'].includes(curso.ruta), `${id}: ruta desconocida`);
        check(id.startsWith(curso.ruta), `${id}: ID y ruta no coinciden`);
        check(typeof curso.imagen === 'string' && curso.imagen.startsWith('/cursos/'), `${id}: imagen debe estar en /cursos/`);
        enlace(curso.imagen, id, 'imagen');
        enlace(curso.brochure, id, 'brochure');
      } else {
        for (const campo of ['registro', 'inicio', 'fin', 'horario', 'sesiones', 'desc', 'casoReal', 'precioSoles']) check(typeof curso[campo] === 'string' && !!curso[campo].trim(), `${id}: falta ${campo}`);
        check(!registros.has(curso.registro), `${id}: nombre de registro duplicado`); registros.add(curso.registro);
        check(typeof curso.cerrado === 'boolean', `${id}: cerrado debe ser booleano`);
        check(['cyan', 'blue', 'orange'].includes(curso.colorKey), `${id}: tema de color desconocido`);
        check(/^S\/\.?\s*\d+(\.\d{2})?$/.test(curso.precioSoles), `${id}: precio en soles inválido`);
        if (!curso.cerrado) check(typeof curso.destacado === 'string' && !!curso.destacado.trim(), `${id}: falta destacado para convocatoria abierta`);
        enlace(curso.hotmart, id, 'hotmart'); enlace(curso.paypal, id, 'paypal');
        if (curso.brochure) enlace(curso.brochure, id, 'brochure');
      }
    }
  }
  return { errores, avisos };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const catalogo = JSON.parse(fs.readFileSync(path.join(root, 'data/cursos.json'), 'utf8'));
    const { errores, avisos } = validarCatalogo(catalogo);
    avisos.forEach(a => console.warn(`AVISO: ${a}`));
    errores.forEach(e => console.error(`ERROR: ${e}`));
    if (errores.length) process.exitCode = 1;
    else console.log(`Catálogo válido: ${catalogo.asincronicos.length} grabados y ${catalogo.sincronicos.length} en vivo. Fechas, precios y destinos externos requieren revisión editorial; no se contactó ningún servicio.`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
