import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; 
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon, 
  IonMenuButton, IonButton, IonInput, IonSelect, IonSelectOption
} from '@ionic/react';
import { 
  notificationsOutline, personCircleOutline, refreshOutline, 
  createOutline // <-- CAMBIO 1: Importamos el ícono del lápiz en vez del ojito
} from 'ionicons/icons';

interface Solicitud {
  id: number;
  titulo: string;
  encargado: string;
  fecha: string;
  estado: string;
  cliente?: string; 
  tipo?: string; 
}

const HistorialFuncionario: React.FC = () => {
  const history = useHistory(); 

  const [todasLasSolicitudes, setTodasLasSolicitudes] = useState<Solicitud[]>([]);
  const [solicitudesMostrar, setSolicitudesMostrar] = useState<Solicitud[]>([]);

  const [filtroId, setFiltroId] = useState('');
  const [filtroTipo, setFiltroTipo] = useState(''); 
  const [ordenFecha, setOrdenFecha] = useState(''); 
  const [filtroCliente, setFiltroCliente] = useState(''); 
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroTitulo, setFiltroTitulo] = useState('');

  useEffect(() => {
    const dataGuardada = localStorage.getItem('solicitudes_db');
    if (dataGuardada) {
      const parsed = JSON.parse(dataGuardada);
      setTodasLasSolicitudes(parsed);
      setSolicitudesMostrar(parsed);
    }
  }, []);

  const obtenerMilisegundos = (fechaStr: string) => {
    if (!fechaStr) return 0;
    const soloFecha = fechaStr.substring(0, 10);
    const partes = soloFecha.split('-');
    if (partes.length === 3) {
      return new Date(`${partes[2]}-${partes[1]}-${partes[0]}`).getTime();
    }
    return 0;
  };

  const manejarBusqueda = () => {
    let filtrado = [...todasLasSolicitudes]; 
    
    if (filtroId) filtrado = filtrado.filter(s => s.id.toString().includes(filtroId));
    if (filtroTipo) filtrado = filtrado.filter(s => s.tipo === filtroTipo);
    if (filtroEstado) filtrado = filtrado.filter(s => s.estado.toLowerCase() === filtroEstado.toLowerCase());
    if (filtroTitulo) filtrado = filtrado.filter(s => s.titulo.toLowerCase().includes(filtroTitulo.toLowerCase()));
    if (filtroCliente) {
      filtrado = filtrado.filter(s => s.cliente && s.cliente.toLowerCase().includes(filtroCliente.toLowerCase()));
    }
    
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
    setFiltroCliente('');
    setFiltroEstado('');
    setFiltroTitulo('');
    setSolicitudesMostrar(todasLasSolicitudes);
  };

  const getColorEstado = (estado: string) => {
    switch(estado.toLowerCase()) {
      case 'recibido': return { bg: '#9c27b0', text: 'white' }; 
      case 'en revisión': return { bg: '#00a8ff', text: 'white' }; 
      case 'observado': return { bg: '#ffcc00', text: '#333' }; 
      case 'pendiente': return { bg: '#8e8e93', text: 'white' }; 
      case 'aprobada': return { bg: '#34c759', text: 'white' }; 
      case 'rechazada': return { bg: '#ff3b30', text: 'white' }; 
      default: return { bg: '#e0e0e0', text: '#333' };
    }
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
              Gestor de Solicitudes
            </IonTitle>
          </div>
          
          <IonButtons slot="end" style={{ margin: '0', height: '56px', display: 'flex', alignItems: 'center' }}>
            <IonIcon icon={notificationsOutline} style={{ fontSize: '1.5rem', marginRight: '15px', cursor: 'pointer' }} />
            <IonIcon icon={personCircleOutline} style={{ fontSize: '1.8rem', marginRight: '15px', cursor: 'pointer' }} />
            
            <div 
              onClick={() => {
                localStorage.setItem('rol_actual', 'ciudadano');
                window.dispatchEvent(new Event('rolCambiado'));
                window.location.href = '/ciudadano/tramites';
              }}
              style={{ 
                backgroundColor: '#e53935', color: 'white', padding: '0 25px', 
                fontWeight: 'bold', fontSize: '0.9rem', height: '100%', 
                display: 'flex', alignItems: 'center', cursor: 'pointer' 
              }}>
              Rol: Funcionario Municipal
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '30px', paddingBottom: '30px', paddingLeft: '20px', paddingRight: '20px' }}>
          
          <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '20px', fontSize: '1.8rem' }}>Solicitudes</h2>

          <div style={{ backgroundColor: '#f4f5f8', borderRadius: '8px', padding: '20px', marginBottom: '20px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1rem', color: '#333', fontWeight: 'bold' }}>Filtrar por</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '5px' }}>ID. Solicitud</label>
                <IonInput value={filtroId} onIonChange={e => setFiltroId(e.detail.value!)} style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', minHeight: '35px' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '5px' }}>Tipo de solicitud</label>
                <IonSelect value={filtroTipo} onIonChange={e => setFiltroTipo(e.detail.value!)} placeholder="Seleccione..." style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', minHeight: '35px', width: '100%' }}>
                  <IonSelectOption value="Tipo 1">Tipo 1</IonSelectOption>
                  <IonSelectOption value="Tipo 2">Tipo 2</IonSelectOption>
                  <IonSelectOption value="Tipo 3">Tipo 3</IonSelectOption>
                  <IonSelectOption value="Tipo 4">Tipo 4</IonSelectOption>
                </IonSelect>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '5px' }}>Fecha solicitud</label>
                <IonSelect value={ordenFecha} onIonChange={e => setOrdenFecha(e.detail.value!)} placeholder="Seleccione orden..." style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', minHeight: '35px', width: '100%' }}>
                  <IonSelectOption value="recientes">Más recientes</IonSelectOption>
                  <IonSelectOption value="antiguas">Más antiguas</IonSelectOption>
                </IonSelect>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '5px' }}>Cliente</label>
                <IonInput value={filtroCliente} onIonChange={e => setFiltroCliente(e.detail.value!)} style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', minHeight: '35px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
              <div style={{ width: '200px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '5px' }}>Estado</label>
                <IonSelect value={filtroEstado} onIonChange={e => setFiltroEstado(e.detail.value!)} placeholder="Seleccione..." style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', minHeight: '35px', width: '100%' }}>
                  <IonSelectOption value="Recibido">Recibido</IonSelectOption>
                  <IonSelectOption value="En revisión">En revisión</IonSelectOption>
                  <IonSelectOption value="Observado">Observado</IonSelectOption>
                  <IonSelectOption value="Pendiente">Pendiente</IonSelectOption>
                  <IonSelectOption value="Aprobada">Aprobada</IonSelectOption>
                  <IonSelectOption value="Rechazada">Rechazada</IonSelectOption>
                </IonSelect>
              </div>
              
              <div style={{ flex: 1 }}><label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '5px' }}>Título solicitud</label><IonInput value={filtroTitulo} onIonChange={e => setFiltroTitulo(e.detail.value!)} style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', minHeight: '35px' }} /></div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <IonButton onClick={manejarBusqueda} style={{ '--background': '#0088ff', '--color': 'white', textTransform: 'none', fontWeight: 'bold', height: '35px', margin: 0 }}>Buscar</IonButton>
                <IonButton onClick={limpiarFiltros} style={{ '--background': '#ffcc00', '--color': 'white', height: '35px', width: '45px', margin: 0 }}><IonIcon icon={refreshOutline} style={{ fontSize: '1.2rem' }} /></IonButton>
              </div>
            </div>
          </div>

          {solicitudesMostrar.length === 0 ? (
            <div style={{ backgroundColor: '#f4f5f8', borderRadius: '8px', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #e0e0e0' }}>
              <p style={{ fontWeight: 'bold', color: '#000', textAlign: 'center', margin: 0, fontSize: '1rem' }}>No hay datos que<br/>mostrar</p>
            </div>
          ) : (
            <div style={{ backgroundColor: '#f4f5f8', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '20px', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #ddd', color: '#000' }}>
                    <th style={{ padding: '15px 10px' }}>Nro. Solicitud</th>
                    <th style={{ padding: '15px 10px' }}>Título solicitud</th>
                    <th style={{ padding: '15px 10px' }}>Encargado de revisión</th>
                    <th style={{ padding: '15px 10px' }}>Fecha de solicitud</th>
                    <th style={{ padding: '15px 10px' }}>Estado</th>
                    <th style={{ padding: '15px 10px' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudesMostrar.map((soli) => (
                    <tr key={soli.id} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '15px 10px', color: '#333' }}>{soli.id}</td>
                      <td style={{ padding: '15px 10px', color: '#333' }}>{soli.titulo}</td>
                      <td style={{ padding: '15px 10px', color: '#333' }}>{soli.encargado}</td>
                      <td style={{ padding: '15px 10px', color: '#333' }}>{soli.fecha}</td>
                      <td style={{ padding: '15px 10px' }}>
                        <span style={{ backgroundColor: getColorEstado(soli.estado).bg, color: getColorEstado(soli.estado).text, padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem' }}>
                          {soli.estado}
                        </span>
                      </td>
                      <td style={{ padding: '15px 10px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        
                        {/* CAMBIO 2: Aquí actualizamos el botón a "Comentar" con el lápiz */}
                        <div onClick={() => history.push(`/funcionario/solicitud/${soli.id}`)} title="Comentar Solicitud" style={{ backgroundColor: '#0088ff', color: 'white', padding: '5px 15px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', gap: '5px' }}>
                          <IonIcon icon={createOutline} /> Comentar
                        </div>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </IonContent>
    </IonPage>
  );
};

export default HistorialFuncionario;