import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonToast } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';

import EncabezadoAplicacion from '../../components/common/EncabezadoAplicacion';
import ContenedorPagina from '../../components/common/ContenedorPagina';
import FormularioCrearYEditarSolicitudes from '../../components/solicitudes/FormularioCrearYEditarSolicitudes';
import DocumentacionSolicitud from '../../components/solicitudes/DocumentacionSolicitud';
import AccionesEnFomularioSolicitud from '../../components/solicitudes/AccionesEnFomularioSolicitud';

import { validarFormularioSolicitud } from '../../dominio/reglas/validarFormularioSolicitud';
import { obtenerSolicitudPorId } from '../../infraestructura/almacenamiento/repositorioLocalSolicitudes';
import { crearSolicitud } from '../../aplicacion/casosDeUso/crearSolicitud';
import { editarSolicitud } from '../../aplicacion/casosDeUso/editarSolicitud';

const DESCRIPCION_EDICION_VACIA = "Esta es la descripción de la solicitud original. Para motivos de transparencia, no se puede editar lo que ya fue enviado, sino que solo tiene permitido agregar más información.";

const RealizarSolicitud: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const esEdicion = !!id;

  const [tipo, setTipo] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcionOriginal, setDescripcionOriginal] = useState('');
  const [descripcionAgregada, setDescripcionAgregada] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const cargarSolicitudEdicion = () => {
    if (!esEdicion) {
      return;
    }

    const solicitudEncontrada = obtenerSolicitudPorId(id);

    if (!solicitudEncontrada) {
      setMensajeError('No se encontró la solicitud que quieres editar.');
      return;
    }

    setTitulo(solicitudEncontrada.titulo);
    setTipo(solicitudEncontrada.tipo || 'Tipo 1');
    setDescripcionOriginal(
      solicitudEncontrada.descripcion || DESCRIPCION_EDICION_VACIA
    );
  };

  const cambiarRolManual = () => {
    const rolActual = localStorage.getItem('rol_actual') || 'solicitante';
    const nuevoRol = rolActual === 'solicitante' ? 'funcionario' : 'solicitante';

    localStorage.setItem('rol_actual', nuevoRol);
    window.dispatchEvent(new Event('rolCambiado'));

    history.push(
      nuevoRol === 'solicitante'
        ? '/ciudadano/tramites'
        : '/funcionario/tramites'
    );
  };

  const guardarFormulario = () => {
    const error = validarFormularioSolicitud({
      tipo,
      titulo,
      descripcionOriginal,
      descripcionAgregada,
      esEdicion
    });

    if (error) {
      setMensajeError(error);
      return;
    }

    if (esEdicion) {
      const solicitudActualizada = editarSolicitud({
        id,
        descripcionOriginal,
        descripcionAgregada
      });

      if (!solicitudActualizada) {
        setMensajeError('No se pudo editar la solicitud.');
        return;
      }
    } else {
      crearSolicitud({
        tipo,
        titulo,
        descripcion: descripcionOriginal
      });
    }

    history.push('/ciudadano/historial');
  };

  useEffect(() => {
    if (esEdicion) {
      cargarSolicitudEdicion();
    }
  }, [id, esEdicion]);

  useEffect(() => {
    if (!esEdicion) {
      setTipo('');
      setTitulo('');
      setDescripcionOriginal('');
      setDescripcionAgregada('');
    }
  }, [esEdicion]);

  return (
    <IonPage>
      <EncabezadoAplicacion
        rol="solicitante"
        rutaNotificaciones="/ciudadano/notificaciones"
        rutaPerfil="/ciudadano/tramites"
        onNavegar={(ruta) => history.push(ruta)}
        permitirCambioManualRol
        onCambiarRolManual={cambiarRolManual}
      />

      <IonContent style={{ '--background': '#ffffff' }}>
        <ContenedorPagina>
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              paddingBottom: '20px'
            }}
          >
            <h2
              style={{
                color: '#000',
                fontWeight: 'bold',
                marginBottom: '20px',
                fontSize: '1.8rem'
              }}
            >
              {esEdicion ? 'Editar solicitud' : 'Realizar nueva solicitud'}
            </h2>

            <div
              style={{
                backgroundColor: '#f4f5f8',
                borderRadius: '8px',
                padding: '30px',
                border: '1px solid #e0e0e0'
              }}
            >
              <FormularioCrearYEditarSolicitudes
                tipo={tipo}
                titulo={titulo}
                descripcionOriginal={descripcionOriginal}
                descripcionAgregada={descripcionAgregada}
                esEdicion={esEdicion}
                onCambiarTipo={setTipo}
                onCambiarTitulo={setTitulo}
                onCambiarDescripcionOriginal={setDescripcionOriginal}
                onCambiarDescripcionAgregada={setDescripcionAgregada}
              />

              <DocumentacionSolicitud />

              <AccionesEnFomularioSolicitud
                esEdicion={esEdicion}
                onGuardar={guardarFormulario}
                onVolver={() => history.goBack()}
              />
            </div>
          </div>
        </ContenedorPagina>

        <IonToast
          isOpen={mensajeError !== ''}
          message={mensajeError}
          duration={2500}
          color="danger"
          position="bottom"
          onDidDismiss={() => setMensajeError('')}
        />
      </IonContent>
    </IonPage>
  );
};

export default RealizarSolicitud;