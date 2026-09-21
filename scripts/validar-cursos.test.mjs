import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validarCatalogo } from './validar-cursos.mjs';

const base = JSON.parse(fs.readFileSync(new URL('../data/cursos.json', import.meta.url), 'utf8'));
test('el catálogo actual conserva recursos y campos necesarios', () => {
  assert.deepEqual(validarCatalogo(base).errores, []);
});
test('rechaza IDs duplicados, archivos inexistentes y URLs inseguras', () => {
  const catalogo = structuredClone(base);
  catalogo.asincronicos.push({ ...catalogo.asincronicos[0], imagen: '/cursos/ausente.webp', link: 'javascript:alert(1)' });
  const { errores } = validarCatalogo(catalogo);
  assert.ok(errores.some(e => e.includes('ID duplicado')));
  assert.ok(errores.some(e => e.includes('archivo local ausente')));
  assert.ok(errores.some(e => e.includes('HTTPS')));
});
test('rechaza precios, rutas y estados ambiguos antes de publicar', () => {
  const catalogo = structuredClone(base);
  catalogo.asincronicos[0].precio = 'gratis';
  catalogo.asincronicos[0].ruta = 'Z';
  catalogo.sincronicos[0].cerrado = 'false';
  catalogo.sincronicos[0].registro = '';
  const { errores } = validarCatalogo(catalogo);
  assert.ok(errores.some(e => e.includes('precio esperado')));
  assert.ok(errores.some(e => e.includes('ruta desconocida')));
  assert.ok(errores.some(e => e.includes('booleano')));
  assert.ok(errores.some(e => e.includes('falta registro')));
});
