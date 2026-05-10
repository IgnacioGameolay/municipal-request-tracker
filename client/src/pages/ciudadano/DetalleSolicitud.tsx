import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon,
  IonMenuButton, useIonViewWillEnter
} from '@ionic/react';
import { notificationsOutline, personCircleOutline } from 'ionicons/icons';

interface HistorialRevision {
  funcionario: string;
  estadoNuevo: string;
  fechaRevision: string;
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
  historialRevisiones?: HistorialRevision[];
}

const DetalleSolicitud: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [solicitud, setSolicitud] = useState<Solicitud | null>(null);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const cargarSolicitud = () => {
    const dataGuardada = localStorage.getItem('solicitudes_db');

    if (dataGuardada) {
      const solicitudes: Solicitud[] = JSON.parse(dataGuardada);
      const soliEncontrada = solicitudes.find((s: Solicitud) => s.id.toString() === id);
      setSolicitud(soliEncontrada || null);
    }
  };

  useEffect(() => {
    cargarSolicitud();
  }, [id]);

  useIonViewWillEnter(() => {
    cargarSolicitud();
  });

  if (!solicitud) return <IonPage><IonContent>Cargando...</IonContent></IonPage>;

  const normalizarEstado = (estado: string) => {
    return estado
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  };

  const getColorEstado = (estado: string) => {
    const estadoNormalizado = normalizarEstado(estado);

    switch (estadoNormalizado) {
      case 'recibido':
        return { bg: '#8e8e93', text: 'white' };

      case 'aprobada':
      case 'aceptada':
        return { bg: '#22c55e', text: 'white' };

      case 'rechazada':
      case 'anulada':
        return { bg: '#ff3b30', text: 'white' };

      case 'pendiente':
      case 'observado':
        return { bg: '#f1c40f', text: 'white' };

      case 'en revision':
      case 'en proceso':
        return { bg: '#00a8e8', text: 'white' };

      default:
        return { bg: '#8e8e93', text: 'white' };
    }
  };

  const mostrarEstado = (estado: string) => {
    const estadoNormalizado = normalizarEstado(estado);

    if (estadoNormalizado === 'en proceso') return 'En revisión';
    if (estadoNormalizado === 'aceptada') return 'Aprobada';

    return estado;
  };

  const obtenerComentariosFuncionario = () => {
    if (solicitud.comentariosFuncionario && solicitud.comentariosFuncionario.trim() !== '') {
      return solicitud.comentariosFuncionario;
    }

    if (
      solicitud.descripcion &&
      solicitud.descripcion.includes('[Funcionario')
    ) {
      return solicitud.descripcion;
    }

    return 'No hay observaciones registradas por el funcionario aún.';
  };

  const obtenerHistorialRevision = () => {
    if (solicitud.historialRevisiones && solicitud.historialRevisiones.length > 0) {
      return solicitud.historialRevisiones;
    }

    if (solicitud.ultimaRevision && solicitud.ultimaRevision.trim() !== '') {
      return [
        {
          funcionario: solicitud.encargado || '---',
          estadoNuevo: mostrarEstado(solicitud.estado) || '---',
          fechaRevision: solicitud.ultimaRevision
        }
      ];
    }

    return [
      {
        funcionario: '---',
        estadoNuevo: '---',
        fechaRevision: '---'
      }
    ];
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': '#0084D8', color: 'white', '--padding-end': '0', '--min-height': '56px' }}>
          <IonButtons slot="start">
            <IonMenuButton style={{ color: 'white' }} />
          </IonButtons>

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

            <div style={{ backgroundColor: '#EDCA4E', color: 'white', padding: '0 25px', fontWeight: 'bold', fontSize: '0.9rem', height: '100%', display: 'flex', alignItems: 'center' }}>
              Rol: Solicitante
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '30px', paddingBottom: '30px', paddingLeft: '20px', paddingRight: '20px' }}>

          <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '25px', fontSize: '1.8rem' }}>
            Información de la solicitud
          </h2>

          <div style={{ backgroundColor: '#f4f5f8', borderRadius: '8px', padding: '18px 30px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center', marginBottom: '45px', position: 'relative' }}>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#000', marginBottom: '10px' }}>
                Estado
              </strong>

              <span style={{
                backgroundColor: getColorEstado(solicitud.estado).bg,
                color: getColorEstado(solicitud.estado).text,
                padding: '5px 16px',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                display: 'inline-block',
                minWidth: '85px'
              }}>
                {mostrarEstado(solicitud.estado)}
              </span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#000', marginBottom: '10px' }}>
                Ult. Encargado de revisión
              </strong>

              <span style={{ fontSize: '0.9rem', color: '#555' }}>
                {solicitud.encargado}
              </span>
            </div>

            <div style={{ textAlign: 'center', position: 'relative' }}>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#000', marginBottom: '10px' }}>
                Última revisión

                <span
                  onClick={() => setMostrarHistorial(!mostrarHistorial)}
                  style={{
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '20px',
                    height: '20px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    marginLeft: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  ?
                </span>
              </strong>

              <span style={{ fontSize: '0.9rem', color: '#555' }}>
                {solicitud.ultimaRevision || '-- -- --'}
              </span>

              {mostrarHistorial && (
                <div style={{
                  position: 'absolute',
                  top: '48px',
                  right: '0',
                  backgroundColor: '#d9d9d9',
                  borderRadius: '3px',
                  minWidth: '420px',
                  zIndex: 20,
                  boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    fontSize: '0.75rem',
                    color: '#000',
                    fontWeight: '500',
                    padding: '8px 10px',
                    borderBottom: '1px solid #c8c8c8'
                  }}>
                    <span>Funcionario responsable</span>
                    <span>Estado nuevo</span>
                    <span>Fecha de revisión</span>
                  </div>

                  {obtenerHistorialRevision().map((revision, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        fontSize: '0.8rem',
                        color: '#000',
                        padding: '10px',
                        backgroundColor: index % 2 === 0 ? '#d9d9d9' : '#eeeeee'
                      }}
                    >
                      <span>{revision.funcionario}</span>
                      <span>{revision.estadoNuevo}</span>
                      <span>{revision.fechaRevision}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <h3 style={{ color: '#000', fontWeight: 'bold', marginBottom: '20px', fontSize: '1.5rem' }}>
            Comentarios
          </h3>

          <div style={{ backgroundColor: '#f4f5f8', borderRadius: '8px', padding: '25px', marginBottom: '30px' }}>
            <div style={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '25px',
              minHeight: '260px',
              color: '#333',
              fontSize: '1rem',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap'
            }}>
              {obtenerComentariosFuncionario()}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div onClick={() => history.goBack()} style={{ color: '#333', fontSize: '1rem', cursor: 'pointer' }}>
              Volver
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default DetalleSolicitud;