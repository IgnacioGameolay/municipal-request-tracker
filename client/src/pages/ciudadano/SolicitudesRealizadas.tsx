import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonToast, useIonViewWillEnter } from '@ionic/react';
import { useHistory } from 'react-router-dom';

import EncabezadoAplicacion from '../../components/common/EncabezadoAplicacion';
import FiltrarSolicitudes from '../../components/solicitudes/FiltrarSolicitudes';
import TablaSolicitudes from '../../components/solicitudes/TablaSolicitudes';
import ModalEliminarSolicitud from '../../components/solicitudes/ModalEliminarSolicitud';

import { Solicitud } from '../../dominio/entidades/Solicitud';
import { obtenerSolicitudesGuardadas } from '../../infraestructura/almacenamiento/repositorioLocalSolicitudes';
import { eliminarSolicitud } from '../../aplicacion/casosDeUso/eliminarSolicitud';

const SolicitudesRealizadas: React.FC = () => {
  const history = useHistory();

  const [todasLasSolicitudes, setTodasLasSolicitudes] = useState<Solicitud[]>([]);
  const [solicitudesMostrar, setSolicitudesMostrar] = useState<Solicitud[]>([]);

  const [mostrarAlertaBorrar, setMostrarAlertaBorrar] = useState(false);
  const [solicitudABorrar, setSolicitudABorrar] = useState<number | null>(null);
  const [mensajeToast, setMensajeToast] = useState('');

  const cargarSolicitudes = () => {
    const solicitudes = obtenerSolicitudesGuardadas();

    setTodasLasSolicitudes(solicitudes);
    setSolicitudesMostrar(solicitudes);
  };

  const cambiarRolManual = () => {
    localStorage.setItem('rol_actual', 'solicitante');
    window.dispatchEvent(new Event('rolCambiado'));
    history.push('/ciudadano/tramites');
  };

  const abrirModalBorrar = (id: number) => {
    setSolicitudABorrar(id);
    setMostrarAlertaBorrar(true);
  };

  const cancelarBorrado = () => {
    setSolicitudABorrar(null);
    setMostrarAlertaBorrar(false);
  };

  const confirmarBorrado = () => {
    if (solicitudABorrar === null) {
      return;
    }

    const solicitudesActualizadas = eliminarSolicitud(solicitudABorrar);

    setTodasLasSolicitudes(solicitudesActualizadas);
    setSolicitudesMostrar(solicitudesActualizadas);
    setSolicitudABorrar(null);
    setMostrarAlertaBorrar(false);
    setMensajeToast('Solicitud eliminada correctamente');
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  useIonViewWillEnter(() => {
    cargarSolicitudes();
  });

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
        <div
          style={{
            maxWidth: '1220px',
            margin: '0 auto',
            paddingTop: '10px',
            paddingBottom: '30px',
            paddingLeft: '20px',
            paddingRight: '20px'
          }}
        >
          <h2
            style={{
              color: '#000',
              fontWeight: '500',
              marginBottom: '10px',
              fontSize: '1.8rem'
            }}
          >
            Solicitudes
          </h2>

          <FiltrarSolicitudes
            solicitudes={todasLasSolicitudes}
            onFiltrar={setSolicitudesMostrar}
          />

          <TablaSolicitudes
            solicitudes={solicitudesMostrar}
            onEditar={(id) => history.push(`/ciudadano/editar-solicitud/${id}`)}
            onDetalle={(id) => history.push(`/ciudadano/solicitud/${id}`)}
            onEliminar={abrirModalBorrar}
          />
        </div>

        <ModalEliminarSolicitud
          abierto={mostrarAlertaBorrar}
          onCancelar={cancelarBorrado}
          onConfirmar={confirmarBorrado}
        />

        <IonToast
          isOpen={!!mensajeToast}
          onDidDismiss={() => setMensajeToast('')}
          message={mensajeToast}
          duration={2000}
          color="dark"
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default SolicitudesRealizadas;