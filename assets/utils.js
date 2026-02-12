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
        console.error(`Error en ${contexto}:`, error);

        if (error.message.includes('network')) {
            return 'Error de conexión. Verifica tu internet.';
        } else if (error.message.includes('duplicate')) {
            return 'Ya existe un registro con estos datos.';
        } else if (error.message.includes('No se pudo leer la base de datos')) {
            return 'No se encontró el certificado o hubo un error en la base de datos.';
        } else {
            return 'Ocurrió un error inesperado. Por favor, intente más tarde.';
        }
    }
};
