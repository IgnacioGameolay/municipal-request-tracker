import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom'; // Para poder cambiar de página
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon, 
  IonMenuButton, IonButton, IonSelect, IonSelectOption, IonInput, IonTextarea,
  IonToast // Para el mensajito flotante de éxito
} from '@ionic/react';
import { 
  notificationsOutline, personCircleOutline, cloudUploadOutline, documentTextOutline 
} from 'ionicons/icons';

const RealizarSolicitud: React.FC = () => {
  const [archivos, setArchivos] = useState<File[]>([]);
  const [mostrarToast, setMostrarToast] = useState(false); // Controla el mensaje de éxito
  const fileInputRef = useRef<HTMLInputElement>(null);
  const history = useHistory(); // Nuestra herramienta para "viajar" entre páginas

  const abrirBuscadorArchivos = () => {
    fileInputRef.current?.click();
  };

  const manejarSeleccionArchivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const nuevosArchivos = Array.from(files);
      setArchivos([...archivos, ...nuevosArchivos]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const eliminarArchivo = (index: number) => {
    const nuevosArchivos = archivos.filter((_, i) => i !== index);
    setArchivos(nuevosArchivos);
  };

  // NUEVA FUNCIÓN: Simula la creación y nos manda al perfil
  const manejarCreacionSolicitud = () => {
    // 1. Aquí a futuro se enviarán los datos a tu base de datos
    console.log("Simulando envío de solicitud con", archivos.length, "archivos adjuntos.");
    
    // 2. Mostramos el mensaje de éxito ("Toast")
    setMostrarToast(true);

    // 3. Esperamos 1.5 segundos para que alcance a leer el mensaje y lo redirigimos
    setTimeout(() => {
      // Te mando de vuelta a la página del perfil (tramites)
      history.push('/ciudadano/tramites');
    }, 1500); 
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': '#2b2d5c', color: 'white' }}>
          <IonButtons slot="start">
            <IonMenuButton style={{ color: 'white' }} />
          </IonButtons>
          <IonTitle style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
            Proyecto web y movil
          </IonTitle>
          <IonButtons slot="end" style={{ display: 'flex', alignItems: 'center' }}>
            <IonIcon icon={notificationsOutline} style={{ fontSize: '1.5rem', marginRight: '15px', cursor: 'pointer' }} />
            <IonIcon icon={personCircleOutline} style={{ fontSize: '1.8rem', marginRight: '15px', cursor: 'pointer' }} />
            <div style={{ backgroundColor: '#cddc39', color: 'white', padding: '0 20px', fontWeight: 'bold', fontSize: '0.9rem', height: '100%', display: 'flex', alignItems: 'center' }}>
              Rol: Solicitante
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#f4f5f8' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '50px', paddingBottom: '50px' }}>
          <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '20px', fontSize: '1.5rem', paddingLeft: '20px' }}>
            Realizar solicitud
          </h2>

          <div style={{ backgroundColor: '#eeeeee', borderRadius: '8px', padding: '30px', margin: '0 20px' }}>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>Tipo de solicitud</label>
              <IonSelect placeholder="Seleccione..." style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', width: '220px', minHeight: '40px' }}>
                <IonSelectOption value="bache">Baches/Pavimentación</IonSelectOption>
                <IonSelectOption value="aseo">Aseo y Ornato</IonSelectOption>
                <IonSelectOption value="iluminacion">Iluminación Pública</IonSelectOption>
              </IonSelect>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>Título de la solicitud</label>
              <IonInput style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', minHeight: '40px' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>Descripción de la solicitud</label>
              <IonTextarea rows={8} style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>Documentación de la solicitud</label>
              
              <input type="file" multiple ref={fileInputRef} style={{ display: 'none' }} onChange={manejarSeleccionArchivo} />

              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', padding: '15px', overflowX: 'auto' }}>
                <IonButton fill="outline" color="dark" style={{ textTransform: 'none', fontSize: '0.9rem', flexShrink: 0 }} onClick={abrirBuscadorArchivos}>
                  <IonIcon slot="start" icon={cloudUploadOutline} />
                  Subir archivo
                </IonButton>

                {archivos.length > 0 && (
                  <div style={{ display: 'flex', gap: '15px', borderLeft: '1px solid #eee', paddingLeft: '15px' }}>
                    {archivos.map((archivo, index) => (
                      <div key={index} style={{ textAlign: 'center', position: 'relative', width: '60px' }}>
                        <div onClick={() => eliminarArchivo(index)} style={{ position: 'absolute', top: -5, right: 0, backgroundColor: '#ff4b4b', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 10 }}>✕</div>
                        <IonIcon icon={documentTextOutline} style={{ fontSize: '2.5rem', color: '#444' }} />
                        <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 'bold', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={archivo.name}>
                          {archivo.name.length > 8 ? archivo.name.substring(0, 6) + '...' : archivo.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px' }}>* La falta de documentación puede llevar a la posterior anulación de la solicitud.</p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            {/* CONECTAMOS EL BOTÓN VERDE A NUESTRA FUNCIÓN */}
            <IonButton 
              onClick={manejarCreacionSolicitud}
              style={{ '--background': '#4ade80', '--color': 'white', width: '280px', height: '50px', fontWeight: 'bold', fontSize: '1.1rem', textTransform: 'none' }}
            >
              Crear Solicitud
            </IonButton>
          </div>

        </div>

        {/* EL MENSAJE FLOTANTE DE ÉXITO */}
        <IonToast
          isOpen={mostrarToast}
          onDidDismiss={() => setMostrarToast(false)}
          message="¡Solicitud creada exitosamente!"
          duration={1500}
          color="success"
          position="bottom"
        />

      </IonContent>
    </IonPage>
  );
};

export default RealizarSolicitud;