// =============================================================================
// UTILIDADES COMPARTIDAS - PROJECT CONTROL AI
// Funciones helper reutilizables en todo el sistema
// =============================================================================

const PCAI_Utils = {

    // --- FORMATEO DE FECHAS ---
    formatearFecha(fecha) {
        if (!fecha) return "---";
        const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
        // Forzamos mediodía para evitar problemas de zona horaria
        return new Date(fecha + 'T12:00:00').toLocaleDateString('es-ES', opciones);
    },

    // --- VALIDACIÓN DE DNI ---
    validarDNI(dni) {
        const regex = /^[0-9]{8,15}$/;
        return regex.test(dni.trim());
    },

    // --- SANITIZACIÓN DE INPUTS ---
    sanitizarInput(texto) {
        if (!texto) return "";
        return texto.trim().replace(/[<>]/g, '');
    },

    // --- NOTIFICACIONES TOAST (mejor que alert) ---
    mostrarNotificacion(mensaje, tipo = 'info') {
        // En futuro esto será un toast elegante
        console.log(`[${tipo.toUpperCase()}] ${mensaje}`);
        alert(mensaje);
    },

    // --- GENERAR LINK DE WHATSAPP ---
    generarLinkWhatsApp(mensaje) {
        const numero = PCAI_CONFIG.whatsapp.contactNumber;
        return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    },

    // --- MANEJO DE ERRORES CONSISTENTE ---
    manejarError(error, contexto = '') {
        console.error(`Error Detallado en ${contexto}:`, error);

        const msg = error.message || "";

        if (msg.toLowerCase().includes('network')) {
            return 'Error de conexión. Verifica tu internet.';
        } else if (error.code === 'PGRST116') {
            return 'No se encontró información en la base de datos para este registro.';
        } else if (msg.toLowerCase().includes('duplicate')) {
            return 'Ya existe un registro con estos datos.';
        } else if (msg.length > 0 && !msg.includes('[object Object]')) {
            // Si el error tiene un mensaje legible, lo mostramos
            return msg;
        } else {
            return 'Ocurrió un error inesperado al procesar los datos. Por favor, intente de nuevo.';
        }
    },

    // --- INICIALIZACIÓN DE BOTONES DE PAGO ---
    // Busca elementos con [data-checkout="key"] y asigna el href desde PCAI_CONFIG
    initCheckoutLinks() {
        const checkoutElements = document.querySelectorAll('[data-checkout], [data-hotmart]');
        if (checkoutElements.length === 0) return;

        checkoutElements.forEach(el => {
            const key = el.getAttribute('data-checkout') || el.getAttribute('data-hotmart');
            if (PCAI_CONFIG.checkouts && PCAI_CONFIG.checkouts[key]) {
                el.href = PCAI_CONFIG.checkouts[key];
                console.log(`Checkout vinculado: ${key}`);
            }
        });
    }
};
