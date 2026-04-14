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
    // --- ENLACES DE PAGO HOTMART (Checkout Centralizado) ---
    hotmart: {
        licitaciones: 'https://pay.hotmart.com/N104187999C',
        evm: 'https://pay.hotmart.com/N104188538H',
        gestion_proyectos: 'https://pay.hotmart.com/K104218834V',
        automation: 'https://pay.hotmart.com/I104227016S',
        p6: 'https://pay.hotmart.com/Q104228911C',
        paypal_global: 'https://paypal.me/ProjectControlAI',
        academy_bundle: 'https://pay.hotmart.com/ACADEMY_BUNDLE_ID' // Ejemplo para el lanzamiento 20/03
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

    // EVM
    "Control y Gerencia EVM": "cert_control_evm.pdf",
    "Control y Gerencia (EVM 4.0)": "cert_control_evm.pdf",

    // Automation
    "Automation Engineer": "cert_automation_engineer.pdf",
    "Automation Engineer (Python/VBA)": "cert_automation_engineer.pdf",

    // Primavera & Webinar
    "Primavera P6 Professional": "cert_primavera_p6.pdf",

};

// --- LISTA DE CURSOS (Single Source of Truth) ---
const CURSOS_DISPONIBLES = [
    { id: 'c1', nombre: 'Licitaciones Inteligentes con IA', fecha_inicio: 'Apr 20, 2026 19:00:00' },
    { id: 'c2', nombre: 'Control y Gerencia EVM', fecha_inicio: 'Apr 28, 2026 19:00:00' },
    { id: 'c3', nombre: 'Gestión de Proyectos con IA', fecha_inicio: 'May 03, 2026 10:00:00' },
    { id: 'c4', nombre: 'Automation Engineer', fecha_inicio: 'Apr 19, 2026 15:00:00' },
    { id: 'c5', nombre: 'Primavera P6 Professional', fecha_inicio: 'Apr 17, 2026 19:00:00' },

];

// --- INICIALIZAR SUPABASE (REUTILIZABLE) ---
function initSupabase() {
    if (typeof supabase === 'undefined') {
        console.error('Supabase SDK no cargado');
        return null;
    }
    return supabase.createClient(PCAI_CONFIG.supabase.url, PCAI_CONFIG.supabase.key);
}
