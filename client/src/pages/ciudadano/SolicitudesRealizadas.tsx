import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon,
  IonMenuButton, IonButton, IonInput, IonSelect, IonSelectOption,
  IonAlert, IonToast, useIonViewWillEnter
} from '@ionic/react';
import {
  notificationsOutline, personCircleOutline, refreshOutline,
  createOutline, trashOutline, helpOutline
} from 'ionicons/icons';

interface Solicitud {
  id: number;
  titulo: string;
  encargado: string;
  fecha: string;
  estado: string;
  tipo?: string;
}

const SolicitudesRealizadas: React.FC = () => {
  const history = useHistory();

  const [todasLasSolicitudes, setTodasLasSolicitudes] = useState<Solicitud[]>([]);
  const [solicitudesMostrar, setSolicitudesMostrar] = useState<Solicitud[]>([]);

  const [filtroId, setFiltroId] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [ordenFecha, setOrdenFecha] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroTitulo, setFiltroTitulo] = useState('');

  const [mostrarAlertaBorrar, setMostrarAlertaBorrar] = useState(false);
  const [solicitudABorrar, setSolicitudABorrar] = useState<number | null>(null);
  const [mensajeToast, setMensajeToast] = useState('');

  const solicitudesIniciales: Solicitud[] = [
    { id: 1, tipo: 'Tipo 1', titulo: 'Solicitud n°1', encargado: 'Por asignar', fecha: '10-05-26 09:15 am', estado: 'Recibido' },
    { id: 2, tipo: 'Tipo 2', titulo: 'Solicitud n°2', encargado: 'Por asignar', fecha: '10-05-26 11:30 am', estado: 'Recibido' },
    { id: 3, tipo: 'Tipo 3', titulo: 'Solicitud n°3', encargado: 'Funcionario n°2', fecha: '05-05-26 03:45 pm', estado: 'Aprobada' },
    { id: 4, tipo: 'Tipo 2', titulo: 'Solicitud n°4', encargado: 'Funcionario n°3', fecha: '06-05-26 10:20 am', estado: 'Aprobada' },
    { id: 5, tipo: 'Tipo 1', titulo: 'Solicitud n°5', encargado: 'Funcionario n°3', fecha: '04-05-26 02:10 pm', estado: 'Rechazada' },
    { id: 6, tipo: 'Tipo 3', titulo: 'Solicitud n°6', encargado: 'Funcionario n°4', fecha: '08-05-26 04:55 pm', estado: 'Pendiente' },
    { id: 7, tipo: 'Tipo 4', titulo: 'Solicitud n°7', encargado: 'Funcionario n°4', fecha: '02-05-26 09:05 am', estado: 'Rechazada' },
    { id: 8, tipo: 'Tipo 4', titulo: 'Solicitud n°8', encargado: 'Funcionario n°5', fecha: '07-05-26 01:30 pm', estado: 'En revisión' },
    { id: 9, tipo: 'Tipo 2', titulo: 'Solicitud n°9', encargado: 'Funcionario n°5', fecha: '09-05-26 10:00 am', estado: 'Pendiente' },
    { id: 10, tipo: 'Tipo 1', titulo: 'Solicitud n°10', encargado: 'Funcionario n°6', fecha: '10-05-26 08:45 am', estado: 'Recibido' }
  ];

  const cargarSolicitudes = () => {
    const dataGuardada = localStorage.getItem('solicitudes_db');

    if (dataGuardada) {
      const solicitudesGuardadas: Solicitud[] = JSON.parse(dataGuardada);

      // Agrega las solicitudes de ejemplo solo si no existen todavía
      const solicitudesCombinadas = [
        ...solicitudesIniciales.filter(
          ejemplo => !solicitudesGuardadas.some(
            guardada => guardada.id.toString() === ejemplo.id.toString()
          )
        ),
        ...solicitudesGuardadas
      ];

      localStorage.setItem('solicitudes_db', JSON.stringify(solicitudesCombinadas));
      setTodasLasSolicitudes(solicitudesCombinadas);
      setSolicitudesMostrar(solicitudesCombinadas);
    } else {
      localStorage.setItem('solicitudes_db', JSON.stringify(solicitudesIniciales));
      setTodasLasSolicitudes(solicitudesIniciales);
      setSolicitudesMostrar(solicitudesIniciales);
    }
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  useIonViewWillEnter(() => {
    cargarSolicitudes();
  });

  const obtenerMilisegundos = (fechaStr: string) => {
    if (!fechaStr) return 0;

    const soloFecha = fechaStr.substring(0, 10);
    const partes = soloFecha.split('-');

    if (partes.length === 3 && partes[0] !== 'DD') {
      return new Date(`${partes[2]}-${partes[1]}-${partes[0]}`).getTime();
    }

    return 0;
  };

  const manejarBusqueda = () => {
    let filtrado = [...todasLasSolicitudes];

    if (filtroId) filtrado = filtrado.filter(s => s.id.toString().includes(filtroId));
    if (filtroTipo) filtrado = filtrado.filter(s => s.tipo === filtroTipo);
    if (filtroEstado) filtrado = filtrado.filter(s => normalizarEstado(s.estado) === normalizarEstado(filtroEstado));
    if (filtroTitulo) filtrado = filtrado.filter(s => s.titulo.toLowerCase().includes(filtroTitulo.toLowerCase()));

    if (ordenFecha === 'recientes') {
      filtrado.sort((a, b) => obtenerMilisegundos(b.fecha) - obtenerMilisegundos(a.fecha));
    } else if (ordenFecha === 'antiguas') {
      filtrado.sort((a, b) => obtenerMilisegundos(a.fecha) - obtenerMilisegundos(b.fecha));
    }

    setSolicitudesMostrar(filtrado);
  };

  const limpiarFiltros = () => {
    setFiltroId('');
    setFiltroTipo('');
    setOrdenFecha('');
    setFiltroEstado('');
    setFiltroTitulo('');
    setSolicitudesMostrar(todasLasSolicitudes);
  };

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
        return { bg: '#16c653', text: 'white' };

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

  const intentarBorrar = (id: number) => {
    setSolicitudABorrar(id);
    setMostrarAlertaBorrar(true);
  };

  const confirmarBorrado = () => {
    if (solicitudABorrar !== null) {
      const nuevaLista = todasLasSolicitudes.filter(s => s.id !== solicitudABorrar);
      setTodasLasSolicitudes(nuevaLista);
      setSolicitudesMostrar(nuevaLista);
      localStorage.setItem('solicitudes_db', JSON.stringify(nuevaLista));
      setMensajeToast('Solicitud eliminada correctamente');
    }
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

  const formatearFechaGuardada = (fecha?: string) => {
    if (!fecha || fecha.trim() === '') {
      return '-- -- --';
    }

    let fechaLimpia = fecha.trim();

    // Quita prefijos como Mi, Ju, Lu, etc.
    fechaLimpia = fechaLimpia.replace(/^(Lu|Ma|Mi|Ju|Vi|Sa|Do)\s+/i, '');

    const match = fechaLimpia.match(/^(\d{2})-(\d{2})-(\d{4})(?:\s+(\d{1,2}):(\d{2})(?:\s*(am|pm))?)?/i);

    if (!match) {
      return fechaLimpia;
    }

    const dia = match[1];
    const mes = match[2];
    const anio = match[3];

    let hora = match[4] ? Number(match[4]) : 12;
    const minutos = match[5] || '00';
    let periodo = match[6]?.toLowerCase();

    // Si viene algo raro como 23:43 pm, lo corrige a 11:43 pm
    if (periodo) {
      if (hora > 12) {
        hora = hora - 12;
      }
    } else {
      periodo = hora >= 12 ? 'pm' : 'am';
      hora = hora % 12;
      hora = hora === 0 ? 12 : hora;
    }

    return `${dia}-${mes}-${anio} ${String(hora).padStart(2, '0')}:${minutos} ${periodo}`;
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
              }}
            >
              Rol: Solicitante
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#ffffff' }}>
        <div style={{ maxWidth: '1220px', margin: '0 auto', paddingTop: '10px', paddingBottom: '30px', paddingLeft: '20px', paddingRight: '20px' }}>

          <h2 style={{ color: '#000', fontWeight: '500', marginBottom: '10px', fontSize: '1.8rem' }}>
            Solicitudes
          </h2>

          <div style={{ backgroundColor: '#f4f5f8', borderRadius: '8px', padding: '16px 24px', marginBottom: '20px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '1rem', color: '#333', fontWeight: 'bold' }}>
              Filtrar por
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '190px 190px 190px', gap: '38px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#333', marginBottom: '5px' }}>
                  ID. Solicitud
                </label>

                <IonInput
                  value={filtroId}
                  onIonChange={e => setFiltroId(e.detail.value!)}
                  style={{ backgroundColor: '#fff', border: '1px solid #aaa', borderRadius: '6px', minHeight: '40px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#333', marginBottom: '5px' }}>
                  Tipo de solicitud
                </label>

                <IonSelect
                  interface="popover"
                  value={filtroTipo}
                  onIonChange={e => setFiltroTipo(e.detail.value!)}
                  placeholder="seleccione..."
                  style={{ backgroundColor: '#fff', border: '1px solid #aaa', borderRadius: '6px', minHeight: '40px', width: '100%' }}
                >
                  <IonSelectOption value="Tipo 1">Tipo 1</IonSelectOption>
                  <IonSelectOption value="Tipo 2">Tipo 2</IonSelectOption>
                  <IonSelectOption value="Tipo 3">Tipo 3</IonSelectOption>
                  <IonSelectOption value="Tipo 4">Tipo 4</IonSelectOption>
                </IonSelect>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#333', marginBottom: '5px' }}>
                  Fecha solicitud
                </label>

                <IonSelect
                  interface="popover"
                  value={ordenFecha}
                  onIonChange={e => setOrdenFecha(e.detail.value!)}
                  placeholder="Seleccione..."
                  style={{ backgroundColor: '#fff', border: '1px solid #aaa', borderRadius: '6px', minHeight: '40px', width: '100%' }}
                >
                  <IonSelectOption value="recientes">Más recientes</IonSelectOption>
                  <IonSelectOption value="antiguas">Más antiguas</IonSelectOption>
                </IonSelect>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '190px 1fr auto', gap: '38px', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#333', marginBottom: '5px' }}>
                  Estado
                </label>

                <IonSelect
                  interface="popover"
                  value={filtroEstado}
                  onIonChange={e => setFiltroEstado(e.detail.value!)}
                  placeholder="seleccione..."
                  style={{ backgroundColor: '#fff', border: '1px solid #aaa', borderRadius: '6px', minHeight: '40px', width: '100%' }}
                >
                  <IonSelectOption value="Recibido">Recibido</IonSelectOption>
                  <IonSelectOption value="En revisión">En revisión</IonSelectOption>
                  <IonSelectOption value="Pendiente">Pendiente</IonSelectOption>
                  <IonSelectOption value="Aprobada">Aprobada</IonSelectOption>
                  <IonSelectOption value="Rechazada">Rechazada</IonSelectOption>
                </IonSelect>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#333', marginBottom: '5px' }}>
                  Título solicitud
                </label>

                <IonInput
                  value={filtroTitulo}
                  onIonChange={e => setFiltroTitulo(e.detail.value!)}
                  style={{ backgroundColor: '#fff', border: '1px solid #aaa', borderRadius: '6px', minHeight: '40px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <IonButton
                  onClick={manejarBusqueda}
                  style={{ '--background': '#0088ff', '--color': 'white', textTransform: 'none', fontWeight: 'bold', height: '40px', margin: 0, width: '85px' }}
                >
                  Buscar
                </IonButton>

                <IonButton
                  onClick={limpiarFiltros}
                  style={{ '--background': '#ffcc00', '--color': 'white', height: '40px', width: '52px', margin: 0 }}
                >
                  <IonIcon icon={refreshOutline} style={{ fontSize: '1.2rem' }} />
                </IonButton>
              </div>
            </div>
          </div>

          {solicitudesMostrar.length === 0 ? (
            <div style={{ backgroundColor: '#f4f5f8', borderRadius: '8px', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #e0e0e0' }}>
              <p style={{ fontWeight: 'bold', color: '#000', textAlign: 'center', margin: 0, fontSize: '1rem' }}>
                No hay datos que<br />mostrar
              </p>
            </div>
          ) : (
            <div style={{ backgroundColor: '#f4f5f8', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '16px 24px', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ color: '#000' }}>
                    <th style={{ padding: '13px 10px', fontWeight: 'bold' }}>ID. Solicitud</th>
                    <th style={{ padding: '13px 10px', fontWeight: 'bold' }}>Tipo solicitud</th>
                    <th style={{ padding: '13px 10px', fontWeight: 'bold' }}>Título solicitud</th>
                    <th style={{ padding: '13px 10px', fontWeight: 'bold' }}>Ult. Encargado de<br />revisión</th>
                    <th style={{ padding: '13px 10px', fontWeight: 'bold' }}>Fecha de la solicitud</th>
                    <th style={{ padding: '13px 10px', fontWeight: 'bold' }}>Estado</th>
                    <th style={{ padding: '13px 10px', fontWeight: 'bold' }}>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {solicitudesMostrar.map((soli) => (
                    <tr key={soli.id}>
                      <td style={{ padding: '13px 10px', color: '#111' }}>{soli.id}</td>
                      <td style={{ padding: '13px 10px', color: '#111' }}>{soli.tipo || 'Tipo 1'}</td>
                      <td style={{ padding: '13px 10px', color: '#111' }}>{soli.titulo}</td>
                      <td style={{ padding: '13px 10px', color: '#111' }}>{soli.encargado}</td>
                      <td style={{ padding: '13px 10px', color: '#111' }}>{formatearFechaGuardada(soli.fecha)}</td>
                      <td style={{ padding: '13px 10px' }}>
                        <span style={{
                          backgroundColor: getColorEstado(soli.estado).bg,
                          color: getColorEstado(soli.estado).text,
                          padding: '5px 14px',
                          borderRadius: '20px',
                          fontWeight: 'bold',
                          fontSize: '0.78rem',
                          display: 'inline-block',
                          minWidth: '78px'
                        }}>
                          {mostrarEstado(soli.estado)}
                        </span>
                      </td>

                      <td style={{ padding: '13px 10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <div
                            onClick={() => history.push(`/ciudadano/editar-solicitud/${soli.id}`)}
                            title="Editar"
                            style={{ backgroundColor: '#0088ff', color: 'white', width: '26px', height: '26px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                          >
                            <IonIcon icon={createOutline} />
                          </div>

                          <div
                            onClick={() => intentarBorrar(soli.id)}
                            title="Borrar"
                            style={{ backgroundColor: '#ff3b30', color: 'white', width: '26px', height: '26px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                          >
                            <IonIcon icon={trashOutline} />
                          </div>

                          <div
                            onClick={() => history.push(`/ciudadano/solicitud/${soli.id}`)}
                            title="Estado"
                            style={{ backgroundColor: '#ffcc00', color: 'white', width: '26px', height: '26px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                          >
                            <IonIcon icon={helpOutline} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

        <IonAlert
          isOpen={mostrarAlertaBorrar}
          onDidDismiss={() => setMostrarAlertaBorrar(false)}
          header="Eliminar solicitud"
          message="¿Estás seguro? No se podrá recuperar la solicitud una vez borrada."
          buttons={[
            { text: 'Cancelar', role: 'cancel', handler: () => setSolicitudABorrar(null) },
            { text: 'Sí, eliminar', role: 'destructive', handler: confirmarBorrado }
          ]}
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