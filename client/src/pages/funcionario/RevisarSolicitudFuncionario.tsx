import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';

import EncabezadoAplicacion from '../../components/common/EncabezadoAplicacion';
import ContenedorPagina from '../../components/common/ContenedorPagina';

import ResumenSolicitud from '../../components/solicitudes/ResumenSolicitud';
import FormularioSolicitud from '../../components/solicitudes/FormularioSolicitud';
import DocumentacionSolicitud from '../../components/solicitudes/DocumentacionSolicitud';
import RevisionSolicitud from '../../components/solicitudes/RevisionSolicitud';
import ModalCambioDeEstado from '../../components/solicitudes/ModalCambioDeEstado';
import ModalSolicitudRechazada from '../../components/solicitudes/ModalSolicitudRechazada';

import { Solicitud } from '../../dominio/entidades/Solicitud';
import { obtenerSolicitudPorId } from '../../infraestructura/almacenamiento/repositorioLocalSolicitudes';
import { actualizarEstadoSolicitud } from '../../aplicacion/casosDeUso/actualizarEstadoSolicitud';

const RevisarSolicitudFuncionario: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [solicitud, setSolicitud] = useState<Solicitud | null>(null);
  const [comentario, setComentario] = useState('');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');

  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);
  const [mostrarModalRechazar, setMostrarModalRechazar] = useState(false);

  const cargarSolicitud = () => {
    const solicitudEncontrada = obtenerSolicitudPorId(id);
    setSolicitud(solicitudEncontrada || null);
  };

  const cambiarRolManual = () => {
    localStorage.setItem('rol_actual', 'funcionario');
    window.dispatchEvent(new Event('rolCambiado'));
    history.push('/funcionario/tramites');
  };

  const abrirModalActualizar = () => {
    setEstadoSeleccionado('');
    setMostrarModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setMostrarModalActualizar(false);
    setEstadoSeleccionado('');
  };

  const cerrarModalRechazar = () => {
    setMostrarModalRechazar(false);
  };

  const cerrarModales = () => {
    setMostrarModalActualizar(false);
    setMostrarModalRechazar(false);
    setEstadoSeleccionado('');
  };

  const confirmarActualizacion = (estadoFinal: string) => {
    if (!estadoFinal) {
      alert('Debes seleccionar un estado nuevo.');
      return;
    }

    const solicitudActualizada = actualizarEstadoSolicitud({
      id,
      estadoNuevo: estadoFinal,
      comentario
    });

    if (!solicitudActualizada) {
      alert('No se pudo actualizar la solicitud.');
      return;
    }

    setSolicitud(solicitudActualizada);
    setComentario('');
    cerrarModales();

    history.push('/funcionario/bandeja');
  };

  useEffect(() => {
    cargarSolicitud();
  }, [id]);

  useIonViewWillEnter(() => {
    cargarSolicitud();
  });

  if (!solicitud) {
    return (
      <IonPage>
        <EncabezadoAplicacion
          rol="funcionario"
          rutaNotificaciones="/funcionario/notificaciones"
          rutaPerfil="/funcionario/tramites"
          onNavegar={(ruta) => history.push(ruta)}
          permitirCambioManualRol
          onCambiarRolManual={cambiarRolManual}
        />

        <IonContent style={{ '--background': '#ffffff' }}>
          <ContenedorPagina>
            <p style={{ color: '#333', fontSize: '1rem' }}>
              No se encontró la solicitud solicitada.
            </p>

            <button
              onClick={() => history.push('/funcionario/bandeja')}
              style={{
                background: 'none',
                border: 'none',
                color: '#333',
                fontSize: '1rem',
                cursor: 'pointer',
                padding: 0,
                marginTop: '15px'
              }}
            >
              Volver a bandeja
            </button>
          </ContenedorPagina>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <EncabezadoAplicacion
        rol="funcionario"
        rutaNotificaciones="/funcionario/notificaciones"
        rutaPerfil="/funcionario/tramites"
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
              Información de la solicitud
            </h2>

            <div
              style={{
                backgroundColor: '#f4f5f8',
                borderRadius: '8px',
                padding: '30px',
                border: '1px solid #e0e0e0'
              }}
            >
              <ResumenSolicitud solicitud={solicitud} />

              <FormularioSolicitud
                solicitud={solicitud}
                comentario={comentario}
                onCambiarComentario={setComentario}
              />

              <DocumentacionSolicitud />

              <RevisionSolicitud
                onRechazar={() => setMostrarModalRechazar(true)}
                onActualizar={abrirModalActualizar}
                onVolver={() => history.goBack()}
              />
            </div>
          </div>

          <ModalCambioDeEstado
            abierto={mostrarModalActualizar}
            solicitud={solicitud}
            estadoSeleccionado={estadoSeleccionado}
            onCambiarEstado={setEstadoSeleccionado}
            onConfirmar={() => confirmarActualizacion(estadoSeleccionado)}
            onCancelar={cerrarModalActualizar}
          />

          <ModalSolicitudRechazada
            abierto={mostrarModalRechazar}
            onConfirmar={() => confirmarActualizacion('Rechazada')}
            onCancelar={cerrarModalRechazar}
          />
        </ContenedorPagina>
      </IonContent>
    </IonPage>
  );
};

export default RevisarSolicitudFuncionario;