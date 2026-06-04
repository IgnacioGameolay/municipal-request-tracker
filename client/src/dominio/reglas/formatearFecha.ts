export const formatearFechaActual = () => {
    const formatter = new Intl.DateTimeFormat('es-CL', {
        timeZone: 'America/Santiago',
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: false // Apagamos el reloj de 12 hrs
    });
    return formatter.format(new Date());
};

export const normalizarFechaVisual = (fecha?: string) => {
    if (!fecha || fecha.trim() === '') return '-- -- --';

    // 1. Intentar leer la fecha como formato universal puro (Prisma/ISO)
    const fechaObj = new Date(fecha);
    if (!isNaN(fechaObj.getTime()) && fecha.includes('T')) {
        try {
            const formatter = new Intl.DateTimeFormat('es-CL', {
                timeZone: 'America/Santiago',
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: false // Apagamos el reloj de 12 hrs
            });
            
            return formatter.format(fechaObj);
        } catch (e) {
            // Si el navegador falla, sigue a la lógica original
        }
    }

    // 2. Lógica de respaldo para datos viejos
    let fechaLimpia = fecha.trim();
    fechaLimpia = fechaLimpia.replace(/^(Lu|Ma|Mi|Ju|Vi|Sa|Do)\s+/i, '');

    const match = fechaLimpia.match(
        /^(\d{1,2})[-/](\d{1,2})[-/](\d{2}|\d{4})(?:\s+(\d{1,2}):(\d{2})(?:\s*(am|pm))?)?/i
    );

    if (!match) return fechaLimpia;

    const dia = String(Number(match[1])).padStart(2, '0');
    const mes = String(Number(match[2])).padStart(2, '0');
    let anio = match[3];
    if (anio.length === 2) anio = `20${anio}`;

    let hora = match[4] ? Number(match[4]) : 0;
    const minutos = match[5] || '00';
    const periodo = match[6]?.toLowerCase();

    // Lo forzamos a 24 horas si es que el dato original venía con am/pm
    if (periodo === 'pm' && hora < 12) hora += 12;
    if (periodo === 'am' && hora === 12) hora = 0;

    // Retornamos sin el am/pm
    return `${dia}-${mes}-${anio} ${String(hora).padStart(2, '0')}:${minutos}`;
};

export const obtenerMilisegundosFecha = (fechaStr?: string) => {
    if (!fechaStr) return 0;
    const fechaNormalizada = normalizarFechaVisual(fechaStr);
    
    // Le quitamos el (am|pm) al regex porque ya no existirá
    const match = fechaNormalizada.match(/^(\d{2})-(\d{2})-(\d{4})\s+(\d{1,2}):(\d{2})$/i);
    if (!match) return 0;

    const dia = Number(match[1]);
    const mes = Number(match[2]) - 1;
    const anio = Number(match[3]);
    const hora = Number(match[4]);
    const minutos = Number(match[5]);

    return new Date(anio, mes, dia, hora, minutos).getTime();
};