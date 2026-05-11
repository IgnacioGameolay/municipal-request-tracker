interface DatosValidacionSolicitud {
    tipo: string;
    titulo: string;
    descripcionOriginal: string;
    descripcionAgregada: string;
    esEdicion: boolean;
}

export const validarFormularioSolicitud = ({
    tipo,
    titulo,
    descripcionOriginal,
    descripcionAgregada,
    esEdicion
}: DatosValidacionSolicitud): string => {
    if (!tipo.trim()) {
        return 'Debe seleccionar un tipo de solicitud.';
    }

    if (!titulo.trim()) {
        return 'Debe ingresar un título para la solicitud.';
    }

    if (titulo.trim().length < 5) {
        return 'El título debe tener al menos 5 caracteres.';
    }

    if (!esEdicion && !descripcionOriginal.trim()) {
        return 'Debe ingresar una descripción para la solicitud.';
    }

    if (!esEdicion && descripcionOriginal.trim().length < 10) {
        return 'La descripción debe tener al menos 10 caracteres.';
    }

    if (esEdicion && !descripcionAgregada.trim()) {
        return 'Debe agregar una descripción complementaria para editar la solicitud.';
    }

    return '';
};