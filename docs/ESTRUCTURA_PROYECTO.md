# Estructura activa

- `app/page.js`: portada de capacitación y consultoría.
- `app/consultoria/page.js`: reunión gratuita y consultoría por hora.
- `app/formacion/page.js`: catálogo, filtros y convocatorias.
- `app/inscripcion/page.js`: registro enviado a Google Apps Script/Sheets.
- `app/portal/`, `app/clases-grabadas/`, `app/recursos/`: acceso y contenido académico con Supabase.
- `app/verificar/`, `app/qc-admin/`, `app/admin/qc/`: certificados y revisión.
- `app/mobile/`: landing de campañas, con contenido editorial independiente.
- `app/components/`: navegación, pie y selección de layout.
- `data/cursos.json`: catálogo compartido de formación e inscripción.
- `lib/oferta.js`: tarifa, duración gratuita y contacto de consultoría.
- `lib/supabase.js`: cliente de Supabase.
- `public/`: portadas, brochures y materiales.
- `.agents/skills/`: asistentes para crear, actualizar y revisar cursos.
- `scripts/validar-cursos.mjs`: validación local ejecutada antes del build.
- `scripts/validar-cursos.test.mjs`: casos válidos e inválidos del catálogo.
- `old_site/`, `docs/legacy/`: archivo histórico.

Consulta `GUIA_MANTENIMIENTO.md` para cambios comerciales. Hotmart, PayPal, PDF y Supabase no se sincronizan al editar el JSON.
