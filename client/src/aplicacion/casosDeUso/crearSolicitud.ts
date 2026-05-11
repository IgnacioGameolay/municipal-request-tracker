import { Solicitud } from '../../dominio/entidades/Solicitud';
import { formatearFechaActual } from '../../dominio/reglas/formatearFecha';
import {
    obtenerSolicitudesGuardadas,
    guardarSolicitudes
} from '../../infraestructura/almacenamiento/repositorioLocalSolicitudes';

interface DatosCrearSolicitud {
    tipo: string;
    titulo: string;
    descripcion: string;
}

export const crearSolicitud = ({
    tipo,
    titulo,
    descripcion
}: DatosCrearSolicitud): Solicitud => {
    const solicitudes = obtenerSolicitudesGuardadas();

    const nuevaSolicitud: Solicitud = {
        id: Math.floor(Math.random() * 1000) + 1,
        titulo: titulo.trim(),
        encargado: 'Por asignar',
        fecha: formatearFechaActual(),
        estado: 'Pendiente',
        tipo: tipo.trim(),
        descripcion: descripcion.trim()
    };

    guardarSolicitudes([...solicitudes, nuevaSolicitud]);

    return nuevaSolicitud;
};