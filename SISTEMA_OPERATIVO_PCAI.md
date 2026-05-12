# 🛰️ Sistema Operativo Project Control AI (PCAI) v5.2
**Guía Maestra de Operaciones y Automatización Supabase**

Este documento centraliza el estado actual de la infraestructura tecnológica y la hoja de ruta para la automatización total de la academia.

---

## 🚀 Logros Alcanzados (Sesión actual)
1.  **Centralización Supabase**: Migración exitosa de la gestión fragmentada a una arquitectura de base de datos relacional robusta.
2.  **Normalización de DNI**: Implementación de lógica inteligente para corregir la eliminación de ceros a la izquierda por parte de Google Sheets (Forzado de 8 dígitos).
3.  **Dashboard de Calidad (QC)**: Creación de un panel administrativo exclusivo para el Director para previsualizar, descargar y habilitar certificados sin consumir créditos de los alumnos.
4.  **Sincronización Inteligente**: Scripts locales en `admin-ops/` que mantienen la paridad entre Google Sheets y Supabase.

---

## 🌐 Directorio de Aplicaciones (Links de Producción)
Usa estos enlaces para la gestión diaria y marketing:

*   🏠 **Home PCAI**: [https://project-control-ai-one.vercel.app/](https://project-control-ai-one.vercel.app/)
*   🛡️ **Dashboard QC (Director)**: [https://project-control-ai-one.vercel.app/qc-admin](https://project-control-ai-one.vercel.app/qc-admin)
*   🎓 **Portal de Verificación (Alumnos)**: [https://project-control-ai-one.vercel.app/verificar](https://project-control-ai-one.vercel.app/verificar)
*   📱 **Mobile Landing (TikTok/IG)**: [https://project-control-ai-one.vercel.app/mobile](https://project-control-ai-one.vercel.app/mobile)
*   📚 **Catálogo de Formación**: [https://project-control-ai-one.vercel.app/formacion](https://project-control-ai-one.vercel.app/formacion)

---

## 🔮 Visión de Automatización Futura (Roadmap)
El objetivo es que **Project Control AI** funcione como un sistema autónomo:

1.  **Matrícula Zero-Touch**: Automatizar la creación de accesos en el momento exacto del pago en Hotmart/Stripe, eliminando la carga manual de datos.
2.  **Portal del Alumno "NASA-Punk"**: Una interfaz privada donde cada estudiante acceda a sus clases grabadas, materiales y certificados con un solo login.
3.  **Notificaciones Inteligentes**: Envío automático de correos con el link de descarga una vez que el Director apruebe el certificado en el Dashboard QC.
4.  **Seguridad RLS**: Implementación de políticas de seguridad a nivel de fila en Supabase para proteger los datos personales de los miles de estudiantes.

---

## 🛠️ Herramientas de Administración Local (`admin-ops/`)
*   `sync_master.js`: Sincroniza Sheets con la Nube.
*   `repair_sheet_dnis.js`: Corrige los DNI en la hoja de cálculo.
*   `vincular_profe.js`: Asigna instructores a nuevos cursos.
*   `manage_qc.js`: Control manual de permisos de descarga.

---
**Desarrollado por Antigravity AI para Project Control AI.**
*"Automatizando el futuro de la ingeniería."*
