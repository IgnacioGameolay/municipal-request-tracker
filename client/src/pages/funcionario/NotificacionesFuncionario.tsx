import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon, 
  IonMenuButton 
} from '@ionic/react';
import { notificationsOutline, personCircleOutline, helpOutline } from 'ionicons/icons';

interface Solicitud {
  id: number;
  titulo: string;
  fecha: string;
  estado: string;
}

const NotificacionesFuncionario: React.FC = () => {
  const history = useHistory();
  const [notificaciones, setNotificaciones] = useState<Solicitud[]>([]);

  useEffect(() => {
    // Leemos la base de datos y filtramos las que necesitan atención inicial
    const dataGuardada = localStorage.getItem('solicitudes_db');
    if (dataGuardada) {
      const db: Solicitud[] = JSON.parse(dataGuardada);
      const solicitudesNuevas = db.filter(s => s.estado === 'Pendiente' || s.estado === 'Recibido');
      // Ordenamos para que las más nuevas salgan arriba (simulando notificaciones)
      solicitudesNuevas.reverse(); 
      setNotificaciones(solicitudesNuevas);
    }
  }, []);

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
            <IonIcon icon={notificationsOutline} style={{ fontSize: '1.5rem', marginRight: '15px', cursor: 'pointer' }} />
            <IonIcon icon={personCircleOutline} style={{ fontSize: '1.8rem', marginRight: '15px', cursor: 'pointer' }} />
            
            <div 
              onClick={() => {
                localStorage.setItem('rol_actual', 'ciudadano');
                window.dispatchEvent(new Event('rolCambiado'));
                window.location.href = '/ciudadano/tramites'; 
              }}
              style={{ 
                backgroundColor: '#e53935', // Rojo Funcionario
                color: 'white', padding: '0 25px', 
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
          
          <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '25px', fontSize: '1.8rem' }}>
            Bandeja de notificaciones
          </h2>

          {notificaciones.length === 0 ? (
             <div style={{ backgroundColor: '#f4f5f8', borderRadius: '8px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #eee' }}>
               <p style={{ color: '#555', fontWeight: '500' }}>No tienes solicitudes nuevas pendientes de revisión.</p>
             </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {notificaciones.map((noti) => (
                <div key={noti.id} style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                  backgroundColor: '#f4f5f8', borderRadius: '8px', padding: '15px 25px',
                  border: '1px solid #eee'
                }}>
                  
                  {/* TEXTO DE LA NOTIFICACIÓN */}
                  <span style={{ color: '#333', fontSize: '0.95rem', fontWeight: '500' }}>
                    Has recibido una nueva solicitud: <strong style={{ color: '#0da6f2' }}>"{noti.titulo}"</strong> (ID: {noti.id})
                  </span>

                  {/* ZONA DERECHA: FECHA Y BOTÓN */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ color: '#555', fontSize: '0.9rem', fontWeight: '500' }}>
                      {noti.fecha}
                    </span>
                    
                    <div 
                      onClick={() => history.push(`/funcionario/solicitud/${noti.id}`)}
                      title="Ver Detalles de Solicitud"
                      style={{ 
                        backgroundColor: '#ffcc00', color: 'white', 
                        width: '32px', height: '32px', borderRadius: '6px', 
                        display: 'flex', justifyContent: 'center', alignItems: 'center', 
                        cursor: 'pointer', fontSize: '1.2rem'
                      }}
                    >
                      <IonIcon icon={helpOutline} />
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotificacionesFuncionario;