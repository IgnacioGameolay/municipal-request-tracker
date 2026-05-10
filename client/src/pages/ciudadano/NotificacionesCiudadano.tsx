import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon,
  IonMenuButton
} from '@ionic/react';
import { notificationsOutline, personCircleOutline, helpOutline } from 'ionicons/icons';

interface Notificacion {
  id: number;
  idSolicitud: number;
  tituloSolicitud: string;
  textoPrincipal: string;
  funcionario: string;
  textoSecundario: string;
  fecha: string;
  estadoSolicitud: string;
  comentarioDetalle: string;
}

interface Solicitud {
  id: number;
  titulo: string;
  encargado: string;
  fecha: string;
  estado: string;
  tipo?: string;
  descripcion?: string;
  descripcionAgregada?: string;
  ultimaRevision?: string;
  comentariosFuncionario?: string;
  historialRevisiones?: {
    funcionario: string;
    estadoNuevo: string;
    fechaRevision: string;
  }[];
}

const NotificacionesCiudadano: React.FC = () => {
  const history = useHistory();

  // Datos simulados (mocks) basados exactamente en tu diseño de Figma
  const notificaciones: Notificacion[] = [
    {
      id: 1,
      idSolicitud: 45,
      tituloSolicitud: 'Solicitud n°45',
      textoPrincipal: 'Tu solicitud "Solicitud n°45" ha sido anulada por ',
      funcionario: 'Funcionario n°2',
      textoSecundario: '',
      fecha: '08-04-2026 11:43 pm',
      estadoSolicitud: 'Anulada',
      comentarioDetalle:
        '[Funcionario n°2 - 08-04-2026 11:43 pm]\n\nLa solicitud fue anulada debido a que no se completó la corrección dentro del plazo indicado.'
    },
    {
      id: 2,
      idSolicitud: 6,
      tituloSolicitud: 'Solicitud n°6',
      textoPrincipal: 'Tu solicitud "Solicitud n°6" cambió de estado a PENDIENTE por ',
      funcionario: 'Funcionario n°2',
      textoSecundario: '',
      fecha: '09-04-2026 12:43 pm',
      estadoSolicitud: 'Pendiente',
      comentarioDetalle:
        '[Funcionario n°2 - 09-04-2026 12:43 pm]\n\nFalta documentación, específicamente:\n\nDocumento n°1\nDocumento n°2\nCédula de identidad'
    },
    {
      id: 3,
      idSolicitud: 87,
      tituloSolicitud: 'Solicitud n°87',
      textoPrincipal: 'Tu solicitud "Solicitud n°87" fue ACEPTADA por ',
      funcionario: 'Funcionario n°3',
      textoSecundario: '',
      fecha: '09-04-2026 12:43 pm',
      estadoSolicitud: 'Aprobada',
      comentarioDetalle:
        '[Funcionario n°3 - 09-04-2026 12:43 pm]\n\nLa solicitud fue revisada y aprobada correctamente.'
    },
    {
      id: 4,
      idSolicitud: 1,
      tituloSolicitud: 'Solicitud inicial',
      textoPrincipal: 'Tu solicitud "Solicitud inicial" fue vista por ',
      funcionario: 'Funcionario n°1',
      textoSecundario: ' y cambió a su estado a EN PROCESO',
      fecha: '08-04-2026 11:43 pm',
      estadoSolicitud: 'En revisión',
      comentarioDetalle:
        '[Funcionario n°1 - 08-04-2026 11:43 pm]\n\nLa solicitud fue revisada y actualmente se encuentra en revisión.'
    }
  ];

  const verDetalleSolicitud = (noti: Notificacion) => {
    const dataGuardada = localStorage.getItem('solicitudes_db');
    const solicitudes: Solicitud[] = dataGuardada ? JSON.parse(dataGuardada) : [];

    const index = solicitudes.findIndex(
      (soli: Solicitud) => soli.id.toString() === noti.idSolicitud.toString()
    );

    if (index !== -1) {
      const solicitudExistente = solicitudes[index];

      const comentarioYaExiste =
        solicitudExistente.comentariosFuncionario?.includes(noti.comentarioDetalle) || false;

      solicitudes[index] = {
        ...solicitudExistente,
        titulo: solicitudExistente.titulo || noti.tituloSolicitud,
        encargado: noti.funcionario,
        estado: noti.estadoSolicitud,
        ultimaRevision: noti.fecha,
        comentariosFuncionario: comentarioYaExiste
          ? solicitudExistente.comentariosFuncionario
          : `${solicitudExistente.comentariosFuncionario || ''}${solicitudExistente.comentariosFuncionario ? '\n\n' : ''}${noti.comentarioDetalle}`,
        historialRevisiones: [
          ...(solicitudExistente.historialRevisiones || []),
          {
            funcionario: noti.funcionario,
            estadoNuevo: noti.estadoSolicitud,
            fechaRevision: noti.fecha
          }
        ]
      };
    } else {
      solicitudes.push({
        id: noti.idSolicitud,
        titulo: noti.tituloSolicitud,
        encargado: noti.funcionario,
        fecha: noti.fecha,
        ultimaRevision: noti.fecha,
        estado: noti.estadoSolicitud,
        tipo: 'Tipo 1',
        descripcion: 'Sin descripción',
        comentariosFuncionario: noti.comentarioDetalle,
        historialRevisiones: [
          {
            funcionario: noti.funcionario,
            estadoNuevo: noti.estadoSolicitud,
            fechaRevision: noti.fecha
          }
        ]
      });
    }

    localStorage.setItem('solicitudes_db', JSON.stringify(solicitudes));
    history.push(`/ciudadano/solicitud/${noti.idSolicitud}`);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        {/* Cabecera con el nuevo Azul Cielo */}
        <IonToolbar style={{ '--background': '#0084D8', color: 'white', '--padding-end': '0', '--min-height': '56px' }}>
          <IonButtons slot="start">
            <IonMenuButton style={{ color: 'white' }} />
          </IonButtons>

          {/* AQUÍ VA EL ESPACIO PARA EL LOGO */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '30px', height: '30px', backgroundColor: 'white', borderRadius: '4px', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#0da6f2', fontSize: '10px', fontWeight: 'bold' }}>
              LOGO
            </div>

            <IonTitle style={{ fontWeight: 'bold', fontSize: '1.4rem', padding: 0 }}>
              Gestor de solicitudes
            </IonTitle>
          </div>

          <IonButtons slot="end" style={{ margin: '0', height: '56px', display: 'flex', alignItems: 'center' }}>
            <IonIcon
              icon={notificationsOutline}
              onClick={() => history.push('/ciudadano/notificaciones')}
              style={{ fontSize: '1.5rem', marginRight: '15px', cursor: 'pointer' }}
            />

            <IonIcon
              icon={personCircleOutline}
              onClick={() => history.push('/ciudadano/tramites')}
              style={{ fontSize: '1.8rem', marginRight: '15px', cursor: 'pointer' }}
            />

            <div
              style={{
                backgroundColor: '#EDCA4E',
                color: 'white',
                padding: '0 25px',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}>
              Rol: Solicitante
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '30px', paddingBottom: '30px', paddingLeft: '20px', paddingRight: '20px' }}>

          <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '25px', fontSize: '1.8rem' }}>
            Notificaciones
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {notificaciones.map((noti) => (
              <div key={noti.id} style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                alignItems: 'center',
                gap: '20px',
                backgroundColor: '#f4f5f8',
                borderRadius: '8px',
                padding: '18px 25px',
                border: '1px solid #eee'
              }}>

                {/* TEXTO DE LA IZQUIERDA CON EL FUNCIONARIO EN AZUL */}
                <span style={{ color: '#333', fontSize: '0.95rem', fontWeight: '500', lineHeight: '1.4' }}>
                  {noti.textoPrincipal}
                  <span style={{ color: '#0da6f2', fontWeight: 'bold' }}>{noti.funcionario}</span>
                  {noti.textoSecundario}
                </span>

                {/* FECHA */}
                <span style={{ color: '#555', fontSize: '0.9rem', fontWeight: '500', whiteSpace: 'nowrap' }}>
                  {noti.fecha}
                </span>

                {/* BOTÓN AMARILLO PARA VER DETALLE */}
                <div
                  onClick={() => verDetalleSolicitud(noti)}
                  title="Ver detalle de la solicitud"
                  style={{
                    backgroundColor: '#ffcc00',
                    color: 'white',
                    width: '38px',
                    height: '38px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '1.3rem'
                  }}
                >
                  <IonIcon icon={helpOutline} />
                </div>

              </div>
            ))}
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotificacionesCiudadano;