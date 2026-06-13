export const formatearFechaActual = () => {
  const formatter = new Intl.DateTimeFormat('es-CL', {
    timeZone: 'America/Santiago',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return formatter.format(new Date());
};

export const normalizarFechaVisual = (fecha?: string): string => {
  if (!fecha || fecha.trim() === '') return '-- -- --';

  // 1. Intentar parsear como fecha ISO (Prisma o API)
  const fechaObj = new Date(fecha);
  if (!isNaN(fechaObj.getTime()) && fecha.includes('T')) {
    try {
      const formatter = new Intl.DateTimeFormat('es-CL', {
        timeZone: 'America/Santiago',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      return formatter.format(fechaObj).replace(',', '');
    } catch (e) {
    }
  }


  let fechaLimpia = fecha.trim().replace(/^(Lu|Ma|Mi|Ju|Vi|Sa|Do)\s+/i, '');


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


  if (periodo === 'pm' && hora < 12) hora += 12;
  if (periodo === 'am' && hora === 12) hora = 0;


  return `${dia}-${mes}-${anio} ${String(hora).padStart(2, '0')}:${minutos}`;
};

export const obtenerMilisegundosFecha = (fechaStr?: string): number => {
  if (!fechaStr) return 0;

  // Normalizar al formato "dd-mm-aaaa HH:MM"
  const fechaNormalizada = normalizarFechaVisual(fechaStr);
  if (fechaNormalizada === '-- -- --') return 0;


  const match = fechaNormalizada.match(/^(\d{2})-(\d{2})-(\d{4})\s+(\d{1,2}):(\d{2})$/);
  if (!match) return 0;

  const dia = Number(match[1]);
  const mes = Number(match[2]) - 1; // meses base 0
  const anio = Number(match[3]);
  const hora = Number(match[4]);
  const minutos = Number(match[5]);


  return Date.UTC(anio, mes, dia, hora, minutos);
};