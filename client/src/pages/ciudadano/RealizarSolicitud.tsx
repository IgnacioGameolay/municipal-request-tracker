import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon, 
  IonMenuButton, IonButton, IonSelect, IonSelectOption, IonInput, IonTextarea,
  IonToast 
} from '@ionic/react';
import { 
  notificationsOutline, personCircleOutline, cloudUploadOutline, documentTextOutline 
} from 'ionicons/icons';

const RealizarSolicitud: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  
  // NUEVOS ESTADOS: Ahora recordamos el tipo y la descripción
  const [tipo, setTipo] = useState('');
  const [titulo, setTitulo] = useState(''); 
  const [descripcion, setDescripcion] = useState('');
  
  const [archivos, setArchivos] = useState<File[]>([]);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AL CARGAR LA PÁGINA: Leemos TODOS los datos
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const guardadas = JSON.parse(localStorage.getItem('solicitudes_db') || '[]');
      const soliAEditar = guardadas.find((s: any) => s.id.toString() === id);
      if (soliAEditar) {
        setTitulo(soliAEditar.titulo || '');
        setTipo(soliAEditar.tipo || '');               // Cargamos el tipo
        setDescripcion(soliAEditar.descripcion || ''); // Cargamos la descripción
      }
    } else {
      // Si es nueva, limpiamos todo
      setIsEditing(false);
      setTitulo('');
      setTipo('');
      setDescripcion('');
      setArchivos([]);
    }
  }, [id]);

  const abrirBuscadorArchivos = () => fileInputRef.current?.click();

  const manejarSeleccionArchivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) setArchivos([...archivos, ...Array.from(files)]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const eliminarArchivo = (index: number) => setArchivos(archivos.filter((_, i) => i !== index));

  const manejarCreacionOEdicion = () => {
    const guardadas = JSON.parse(localStorage.getItem('solicitudes_db') || '[]');

    if (isEditing) {
      // MODO EDICIÓN: Actualizamos TODOS los campos
      const index = guardadas.findIndex((s: any) => s.id.toString() === id);
      if (index !== -1) {
        guardadas[index].titulo = titulo;
        guardadas[index].tipo = tipo;               // Guardamos el tipo editado
        guardadas[index].descripcion = descripcion; // Guardamos la descripción editada
        guardadas[index].estado = 'Recibido'; 
        guardadas[index].fecha = new Date().toLocaleString('es-CL', { 
          day: '2-digit', month: '2-digit', year: 'numeric', 
          hour: '2-digit', minute: '2-digit', hour12: true 
        });
      }
      localStorage.setItem('solicitudes_db', JSON.stringify(guardadas));
    } else {
      // MODO CREACIÓN: Guardamos TODOS los campos
      const nuevaSolicitud = {
        id: Math.floor(Math.random() * 100) + 1,
        titulo: titulo || 'Solicitud sin título',
        tipo: tipo,               // Guardamos el tipo
        descripcion: descripcion, // Guardamos la descripción
        encargado: 'Por asignar',
        fecha: new Date().toLocaleString('es-CL', { 
          day: '2-digit', month: '2-digit', year: 'numeric', 
          hour: '2-digit', minute: '2-digit', hour12: true 
        }),
        estado: 'Pendiente'
      };
      localStorage.setItem('solicitudes_db', JSON.stringify([nuevaSolicitud, ...guardadas]));
    }

    setMostrarToast(true);
    setTimeout(() => {
      history.push('/ciudadano/historial');
    }, 1000); 
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': '#2b2d5c', color: 'white', '--padding-end': '0', '--min-height': '56px' }}>
          <IonButtons slot="start">
            <IonMenuButton style={{ color: 'white' }} />
          </IonButtons>
          
          <IonTitle style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
            Proyecto web y movil
          </IonTitle>
          
          <IonButtons slot="end" style={{ margin: '0', height: '56px', display: 'flex', alignItems: 'center' }}>
            <IonIcon icon={notificationsOutline} style={{ fontSize: '1.5rem', marginRight: '15px', cursor: 'pointer' }} />
            <IonIcon icon={personCircleOutline} style={{ fontSize: '1.8rem', marginRight: '15px', cursor: 'pointer' }} />
            {/* EL CUADRO AMARILLO AHORA TOMA EL 100% DE LA ALTURA Y PEGA AL BORDE */}
            <div style={{ backgroundColor: '#cddc39', color: 'white', padding: '0 25px', fontWeight: 'bold', fontSize: '0.9rem', height: '100%', display: 'flex', alignItems: 'center' }}>
              Rol: Solicitante
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#f4f5f8' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '50px', paddingBottom: '50px' }}>
          
          <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '20px', fontSize: '1.5rem', paddingLeft: '20px' }}>
            {isEditing ? `Editar Solicitud NRO. ${id}` : 'Realizar solicitud'}
          </h2>

          <div style={{ backgroundColor: '#eeeeee', borderRadius: '8px', padding: '30px', margin: '0 20px' }}>
            
            {/* AQUÍ CONECTAMOS EL TIPO */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>Tipo de solicitud</label>
              <IonSelect value={tipo} onIonChange={e => setTipo(e.detail.value!)} placeholder="Seleccione..." style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', width: '220px', minHeight: '40px' }}>
                <IonSelectOption value="bache">Baches/Pavimentación</IonSelectOption>
                <IonSelectOption value="aseo">Aseo y Ornato</IonSelectOption>
                <IonSelectOption value="iluminacion">Iluminación Pública</IonSelectOption>
              </IonSelect>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>Título de la solicitud</label>
              <IonInput value={titulo} onIonChange={e => setTitulo(e.detail.value!)} style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', minHeight: '40px' }} />
            </div>

            {/* AQUÍ CONECTAMOS LA DESCRIPCIÓN */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>Descripción de la solicitud</label>
              <IonTextarea value={descripcion} onIonChange={e => setDescripcion(e.detail.value!)} rows={8} style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>Documentación de la solicitud</label>
              <input type="file" multiple ref={fileInputRef} style={{ display: 'none' }} onChange={manejarSeleccionArchivo} />
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', padding: '15px', overflowX: 'auto' }}>
                <IonButton fill="outline" color="dark" style={{ textTransform: 'none', fontSize: '0.9rem', flexShrink: 0 }} onClick={abrirBuscadorArchivos}>
                  <IonIcon slot="start" icon={cloudUploadOutline} /> Subir archivo
                </IonButton>
                {archivos.length > 0 && (
                  <div style={{ display: 'flex', gap: '15px', borderLeft: '1px solid #eee', paddingLeft: '15px' }}>
                    {archivos.map((archivo, index) => (
                      <div key={index} style={{ textAlign: 'center', position: 'relative', width: '60px' }}>
                        <div onClick={() => eliminarArchivo(index)} style={{ position: 'absolute', top: -5, right: 0, backgroundColor: '#ff4b4b', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 10 }}>✕</div>
                        <IonIcon icon={documentTextOutline} style={{ fontSize: '2.5rem', color: '#444' }} />
                        <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 'bold', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{archivo.name.length > 8 ? archivo.name.substring(0, 6) + '...' : archivo.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            <IonButton onClick={manejarCreacionOEdicion} style={{ '--background': '#4ade80', '--color': 'white', width: '280px', height: '50px', fontWeight: 'bold', fontSize: '1.1rem', textTransform: 'none' }}>
              {isEditing ? 'Guardar Cambios' : 'Crear Solicitud'}
            </IonButton>
          </div>
        </div>
        
        <IonToast isOpen={mostrarToast} onDidDismiss={() => setMostrarToast(false)} message={isEditing ? "¡Solicitud actualizada correctamente!" : "¡Solicitud creada exitosamente!"} duration={1500} color="success" position="bottom" />
      </IonContent>
    </IonPage>
  );
};

export default RealizarSolicitud;