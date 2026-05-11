export const formatearFechaActual = () => {
  const fecha = new Date();

  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();

  let hora = fecha.getHours();
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  const periodo = hora >= 12 ? 'pm' : 'am';

  hora = hora % 12;
  hora = hora === 0 ? 12 : hora;

  return `${dia}-${mes}-${anio} ${String(hora).padStart(2, '0')}:${minutos} ${periodo}`;
};

export const normalizarFechaVisual = (fecha?: string) => {
  if (!fecha || fecha.trim() === '') return '-- -- --';

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

  let hora = match[4] ? Number(match[4]) : 12;
  const minutos = match[5] || '00';
  let periodo = match[6]?.toLowerCase();

  if (periodo) {
    if (hora > 12) hora -= 12;
  } else {
    periodo = hora >= 12 ? 'pm' : 'am';
    hora = hora % 12;
    hora = hora === 0 ? 12 : hora;
  }

  return `${dia}-${mes}-${anio} ${String(hora).padStart(2, '0')}:${minutos} ${periodo}`;
};