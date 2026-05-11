import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';

import EncabezadoAplicacion from '../../components/common/EncabezadoAplicacion';
import ContenedorPagina from '../../components/common/ContenedorPagina';
import ResumenSolicitud from '../../components/solicitudes/ResumenSolicitud';
import ComentariosSolicitud from '../../components/solicitudes/ComentariosSolicitud';

import { Solicitud } from '../../dominio/entidades/Solicitud';
import { obtenerSolicitudPorId } from '../../infraestructura/almacenamiento/repositorioLocalSolicitudes';

const DetalleSolicitud: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [solicitud, setSolicitud] = useState<Solicitud | null>(null);

  const cargarSolicitud = () => {
    const solicitudEncontrada = obtenerSolicitudPorId(id);
    setSolicitud(solicitudEncontrada || null);
  };

  const cambiarRolManual = () => {
    localStorage.setItem('rol_actual', 'solicitante');
    window.dispatchEvent(new Event('rolCambiado'));
    history.push('/ciudadano/tramites');
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
          rol="solicitante"
          rutaNotificaciones="/ciudadano/notificaciones"
          rutaPerfil="/ciudadano/tramites"
          onNavegar={(ruta) => history.push(ruta)}
          permitirCambioManualRol
          onCambiarRolManual={cambiarRolManual}
        />

        <IonContent style={{ '--background': '#ffffff' }}>
          <ContenedorPagina>
            <p style={{ color: '#333', fontSize: '1rem' }}>
              Cargando solicitud...
            </p>
          </ContenedorPagina>
        </IonContent>
      </IonPage>
    );
  }

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
          <h2
            style={{
              color: '#000',
              fontWeight: 'bold',
              marginBottom: '25px',
              fontSize: '1.8rem'
            }}
          >
            Información de la solicitud
          </h2>

          <ResumenSolicitud solicitud={solicitud} />

          <ComentariosSolicitud solicitud={solicitud} />

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <button
              onClick={() => history.goBack()}
              style={{
                background: 'none',
                border: 'none',
                color: '#333',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Volver
            </button>
          </div>
        </ContenedorPagina>
      </IonContent>
    </IonPage>
  );
};

export default DetalleSolicitud;