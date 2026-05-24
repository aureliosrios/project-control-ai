// =============================================================================
// CONFIGURACIÓN GLOBAL - PROJECT CONTROL AI
// Este archivo centraliza todas las configuraciones sensibles y constantes
// =============================================================================

const PCAI_CONFIG = {
    supabase: {
        url: 'https://bpsumudexpywfffcwpun.supabase.co',
        key: 'sb_publishable_OzjgZjclmEDlDuVdLGuvQQ_SyX2aTy0'
    },
    googleSheets: {
        scriptUrl: 'https://script.google.com/macros/s/AKfycbwPvR7sL6JQMM9EEs-X9jHGB-JL93U4sxpN9YR-pxcdcFKza5wxxfrtteU9O19lBiftzA/exec'
    },
    whatsapp: {
        contactNumber: '51993147501',
        defaultMessage: 'Hola Ing. Aurelio, deseo información de los cursos de Project Control AI'
    },
    // --- ENLACES DE PAGO (Checkout Centralizado) ---
    checkouts: {
        licitaciones: 'https://pay.hotmart.com/N104187999C',
        gestion_proyectos: 'https://pay.hotmart.com/K104218834V',
        automation: 'https://pay.hotmart.com/I104227016S',
        paypal_global: 'https://paypal.me/ProjectControlAI',
        academy_bundle: 'https://pay.hotmart.com/ACADEMY_BUNDLE_ID', // Ejemplo para el lanzamiento 20/03
        forense: 'https://pay.hotmart.com/O105604032H',
        presupuestos: 'https://pay.hotmart.com/H105703259M'
    }
};

// --- PLANTILLAS DE CERTIFICADOS ---
// Se recomienda usar el nombre exacto de la tabla 'cursos' en Supabase
const PLANTILLAS_CURSOS = {
    // Licitaciones
    "Licitaciones Inteligentes": "cert_licitaciones_ia.pdf",
    "Licitaciones Inteligentes con IA": "cert_licitaciones_ia.pdf",

    // Gestión de Proyectos
    "Gestion Proyectos IA": "cert_gestion_integral.pdf",
    "Gestión Proyectos IA": "cert_gestion_integral.pdf",
    "Gestion de Proyectos con IA": "cert_gestion_integral.pdf",
    "Gestión de Proyectos con IA": "cert_gestion_integral.pdf",
    "El Despertar de la IA para la Gestión de Proyectos": "cert_gestion_integral.pdf",


    // Automatización
    "Automation Engineer": "cert_automation_engineer.pdf",
    "Automation Engineer (Python/VBA)": "cert_automation_engineer.pdf",
    "Automatización en la Ingeniería": "cert_automation_engineer.pdf",
    "Ingeniería Aumentada: Automatización con Agentes de IA": "cert_automation_engineer.pdf",


};

// --- LISTA DE CURSOS (Single Source of Truth) ---
const CURSOS_DISPONIBLES = [
    { id: 'c3', nombre: 'El Despertar de la IA para la Gestión de Proyectos', fecha_inicio: 'May 31, 2026 10:00:00' },
    { id: 'c4', nombre: 'Ingeniería Aumentada: Automatización con Agentes de IA', fecha_inicio: 'May 31, 2026 15:00:00' },
    { id: 'c1', nombre: 'Licitaciones Inteligentes con IA', fecha_inicio: 'May 25, 2026 19:00:00' },

];

// --- INICIALIZAR SUPABASE (REUTILIZABLE) ---
function initSupabase() {
    if (typeof supabase === 'undefined') {
        console.error('Supabase SDK no cargado');
        return null;
    }
    return supabase.createClient(PCAI_CONFIG.supabase.url, PCAI_CONFIG.supabase.key);
}
