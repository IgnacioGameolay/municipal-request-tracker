import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon,
  IonMenuButton, IonInput, IonSelect, IonSelectOption, IonModal, useIonViewWillEnter
} from '@ionic/react';
import { notificationsOutline, personCircleOutline, documentOutline } from 'ionicons/icons';

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
  comentariosFuncionario?: string;
  ultimaRevision?: string;
  historialRevisiones?: HistorialRevision[];
}

const RevisarSolicitudFuncionario: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [solicitud, setSolicitud] = useState<Solicitud | null>(null);
  const [comentario, setComentario] = useState('');

  // ESTADOS PARA LOS MODALES
  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);
  const [mostrarModalRechazar, setMostrarModalRechazar] = useState(false);
  const [nuevoEstadoSeleccionado, setNuevoEstadoSeleccionado] = useState('');

  const cargarSolicitud = () => {
    const dataGuardada = localStorage.getItem('solicitudes_db');

    if (dataGuardada) {
      const db: Solicitud[] = JSON.parse(dataGuardada);
      const solicitudEncontrada = db.find(s => s.id.toString() === id);

      if (solicitudEncontrada) {
        setSolicitud(solicitudEncontrada);
        setNuevoEstadoSeleccionado(solicitudEncontrada.estado);
      }
    }
  };

  useEffect(() => {
    cargarSolicitud();
  }, [id]);

  useIonViewWillEnter(() => {
    cargarSolicitud();
  });

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

  // FUNCIÓN DEFINITIVA PARA GUARDAR (Se llama desde los modales)
  const abrirModalActualizar = () => {
    setNuevoEstadoSeleccionado('');
    setMostrarModalActualizar(true);
  };

  const formatearFechaActual = () => {
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

  const confirmarYGuardar = (estadoFinal: string) => {
    if (!estadoFinal) {
      alert('Debes seleccionar un estado nuevo.');
      return;
    }

    const dataGuardada = localStorage.getItem('solicitudes_db');

    if (dataGuardada && solicitud) {
      const db: Solicitud[] = JSON.parse(dataGuardada);
      const index = db.findIndex(s => s.id.toString() === id);

      if (index !== -1) {
        const funcionarioResponsable = db[index].encargado === 'Por asignar'
          ? 'Funcionario Municipal'
          : db[index].encargado;

        const fechaRevision = formatearFechaActual();

        const solicitudActualizada: Solicitud = {
          ...db[index],
          estado: estadoFinal,
          encargado: funcionarioResponsable,
          ultimaRevision: fechaRevision,
          historialRevisiones: [
            ...(db[index].historialRevisiones || []),
            {
              funcionario: funcionarioResponsable,
              estadoNuevo: estadoFinal,
              fechaRevision: fechaRevision
            }
          ]
        };

        if (comentario.trim() !== '') {
          const textoComentario = `\n\n[Comentario del Funcionario - ${fechaRevision}]: ${comentario}`;

          solicitudActualizada.comentariosFuncionario =
            (solicitudActualizada.comentariosFuncionario || '') + textoComentario;
        }

        db[index] = solicitudActualizada;

        localStorage.setItem('solicitudes_db', JSON.stringify(db));

        setSolicitud(solicitudActualizada);
        setNuevoEstadoSeleccionado(estadoFinal);
        setComentario('');
      }


    }

    setMostrarModalActualizar(false);
    setMostrarModalRechazar(false);

    history.push('/funcionario/bandeja');
  };

  if (!solicitud) {
    return <IonPage><IonContent>Cargando solicitud...</IonContent></IonPage>;
  }

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
              onClick={() => history.push('/funcionario/notificaciones')}
              style={{ fontSize: '1.5rem', marginRight: '15px', cursor: 'pointer' }}
            />

            <IonIcon
              icon={personCircleOutline}
              onClick={() => history.push('/funcionario/tramites')}
              style={{ fontSize: '1.8rem', marginRight: '15px', cursor: 'pointer' }}
            />

            <div
              style={{
                backgroundColor: '#e53935',
                color: 'white',
                padding: '0 25px',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Rol: Funcionario Municipal
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#ffffff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '30px', paddingBottom: '50px', paddingLeft: '20px', paddingRight: '20px' }}>

          <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '20px', fontSize: '1.8rem' }}>
            Información de la solicitud
          </h2>

          <div style={{ backgroundColor: '#f4f5f8', borderRadius: '8px', padding: '30px', border: '1px solid #e0e0e0' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '25px', textAlign: 'center' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.85rem', color: '#333', fontWeight: 'bold', marginBottom: '8px' }}>
                  Estado
                </span>

                <span style={{
                  backgroundColor: getColorEstado(solicitud.estado).bg,
                  color: getColorEstado(solicitud.estado).text,
                  padding: '5px 15px',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  display: 'inline-block',
                  minWidth: '85px'
                }}>
                  {mostrarEstado(solicitud.estado)}
                </span>
              </div>

              <div>
                <span style={{ display: 'block', fontSize: '0.85rem', color: '#333', fontWeight: 'bold', marginBottom: '8px' }}>
                  Encargado
                </span>

                <span style={{ color: '#555', fontSize: '0.9rem' }}>
                  {solicitud.encargado}
                </span>
              </div>

              <div>
                <span style={{ display: 'block', fontSize: '0.85rem', color: '#333', fontWeight: 'bold', marginBottom: '8px' }}>
                  Última revisión
                </span>

                <span style={{ color: '#555', fontSize: '0.9rem' }}>
                  {solicitud.ultimaRevision || '-- -- --'}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#333', marginBottom: '8px', fontWeight: '500' }}>
                Tipo de solicitud
              </label>

              <IonInput
                value={solicitud.tipo || 'Tipo 1'}
                disabled
                style={{
                  backgroundColor: '#d3d3d3',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '40px',
                  width: '200px',
                  paddingLeft: '10px',
                  color: '#555'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#333', marginBottom: '8px', fontWeight: '500' }}>
                Título de la solicitud
              </label>

              <IonInput
                value={solicitud.titulo}
                disabled
                style={{
                  backgroundColor: '#d3d3d3',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '40px',
                  paddingLeft: '10px',
                  color: '#555'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#333', marginBottom: '8px', fontWeight: '500' }}>
                  Descripción de la solicitud
                </label>

                <textarea
                  value={solicitud.descripcion || 'Sin descripción'}
                  disabled
                  style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#d3d3d3',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '10px',
                    resize: 'none',
                    color: '#555',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#333', marginBottom: '8px', fontWeight: '500' }}>
                  Comentar solicitud
                </label>

                <textarea
                  placeholder="Escribe tus observaciones aquí..."
                  value={comentario}
                  onChange={e => setComentario(e.target.value)}
                  style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '10px',
                    resize: 'none',
                    color: '#000',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#333', marginBottom: '15px', fontWeight: '500' }}>
                Documentación de la solicitud
              </label>

              <div style={{ display: 'flex', gap: '15px', backgroundColor: '#d3d3d3', border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
                <div style={{ textAlign: 'center', opacity: 0.7 }}>
                  <IonIcon icon={documentOutline} style={{ fontSize: '2.5rem', color: '#333' }} />
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#333', marginTop: '5px' }}>
                    Permiso...
                  </span>
                </div>

                <div style={{ textAlign: 'center', opacity: 0.7 }}>
                  <IonIcon icon={documentOutline} style={{ fontSize: '2.5rem', color: '#333' }} />
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#333', marginTop: '5px' }}>
                    Datos p...
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
              <div style={{ flex: 1, display: 'flex', gap: '20px', justifyContent: 'center' }}>

                {/* BOTÓN ABRE MODAL RECHAZAR */}
                <button
                  onClick={() => setMostrarModalRechazar(true)}
                  style={{
                    backgroundColor: '#ff3b30',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '15px 30px',
                    cursor: 'pointer',
                    width: '250px'
                  }}
                >
                  Rechazar solicitud
                </button>

                {/* BOTÓN ABRE MODAL ACTUALIZAR */}
                <button
                  onClick={abrirModalActualizar}
                  style={{
                    backgroundColor: '#0088ff',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '15px 30px',
                    cursor: 'pointer',
                    width: '250px'
                  }}
                >
                  Actualizar solicitud
                </button>

              </div>

              <button
                onClick={() => history.goBack()}
                style={{ background: 'none', border: 'none', color: '#555', fontSize: '1rem', cursor: 'pointer' }}
              >
                Volver
              </button>
            </div>

          </div>
        </div>

        {/* ========================================= */}
        {/* MODAL 1: ACTUALIZAR ESTADO                */}
        {/* ========================================= */}
        <IonModal
          isOpen={mostrarModalActualizar}
          onDidDismiss={() => setMostrarModalActualizar(false)}
          style={{ '--width': '400px', '--height': '350px', '--border-radius': '12px' }}
        >
          <div style={{ padding: '30px', textAlign: 'center', backgroundColor: '#f4f5f8', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h2 style={{ color: '#000', fontWeight: 'bold', fontSize: '1.4rem', marginTop: 0 }}>
              Cambiar estado de la solicitud
            </h2>

            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '30px 0' }}>
              {/* Estado Actual */}
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: '#333', fontWeight: 'bold', marginBottom: '10px' }}>
                  Estado actual
                </span>

                <span style={{
                  backgroundColor: getColorEstado(solicitud.estado).bg,
                  color: getColorEstado(solicitud.estado).text,
                  padding: '5px 15px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {mostrarEstado(solicitud.estado)}
                </span>
              </div>

              {/* Estado Nuevo */}
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: '#333', fontWeight: 'bold', marginBottom: '10px' }}>
                  Estado nuevo
                </span>

                <IonSelect
                  interface="popover"
                  value={nuevoEstadoSeleccionado}
                  placeholder="Seleccione..."
                  onIonChange={e => setNuevoEstadoSeleccionado(e.detail.value!)}
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    minHeight: '30px',
                    padding: '0 10px',
                    fontSize: '0.8rem'
                  }}
                >
                  <IonSelectOption value="Recibido">Recibido</IonSelectOption>
                  <IonSelectOption value="En revisión">En revisión</IonSelectOption>
                  <IonSelectOption value="Pendiente">Pendiente</IonSelectOption>
                  <IonSelectOption value="Aprobada">Aprobada</IonSelectOption>
                  <IonSelectOption value="Rechazada">Rechazada</IonSelectOption>
                </IonSelect>
              </div>
            </div>

            <button
              onClick={() => confirmarYGuardar(nuevoEstadoSeleccionado)}
              disabled={!nuevoEstadoSeleccionado}
              style={{
                backgroundColor: nuevoEstadoSeleccionado ? '#68cc24' : '#bfbfbf',
                color: 'white',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '4px',
                padding: '15px',
                cursor: nuevoEstadoSeleccionado ? 'pointer' : 'not-allowed',
                fontSize: '1.1rem'
              }}
            >
              Confirmar cambios
            </button>

            <button
              onClick={() => setMostrarModalActualizar(false)}
              style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: '10px' }}
            >
              Cancelar
            </button>
          </div>
        </IonModal>

        {/* ========================================= */}
        {/* MODAL 2: RECHAZAR SOLICITUD               */}
        {/* ========================================= */}
        <IonModal
          isOpen={mostrarModalRechazar}
          onDidDismiss={() => setMostrarModalRechazar(false)}
          style={{ '--width': '400px', '--height': '300px', '--border-radius': '12px' }}
        >
          <div style={{ padding: '40px 30px', textAlign: 'center', backgroundColor: '#f4f5f8', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h2 style={{ color: '#000', fontWeight: 'bold', fontSize: '1.6rem', margin: 0, lineHeight: '1.3' }}>
              ¿Confirmar rechazo de<br />solicitud?
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
              <button
                onClick={() => confirmarYGuardar('Rechazada')}
                style={{
                  backgroundColor: '#ff3b30',
                  color: 'white',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '15px',
                  cursor: 'pointer',
                  fontSize: '1.1rem'
                }}
              >
                Confirmar
              </button>

              <button
                onClick={() => setMostrarModalRechazar(false)}
                style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: '10px' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </IonModal>

      </IonContent>
    </IonPage >
  );
};

export default RevisarSolicitudFuncionario;