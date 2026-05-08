import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon, 
  IonMenuButton 
} from '@ionic/react';
import { notificationsOutline, personCircleOutline, helpOutline } from 'ionicons/icons';

const NotificacionesCiudadano: React.FC = () => {
  const history = useHistory();

  // Datos simulados (mocks) basados exactamente en tu diseño de Figma
  const notificaciones = [
    {
      id: 1,
      textoPrincipal: 'Tu solicitud "Solicitud n°45" ha sido anulada por ',
      funcionario: 'Funcionario n°2',
      textoSecundario: '',
      fecha: 'Mi 08-04-2026 23:43 pm'
    },
    {
      id: 2,
      textoPrincipal: 'Tu solicitud "Solicitud n°6" cambió de estado a PENDIENTE por ',
      funcionario: 'Funcionario n°2',
      textoSecundario: '',
      fecha: 'Ju 09-04-2026 12:43 pm'
    },
    {
      id: 3,
      textoPrincipal: 'Tu solicitud "Solicitud n°87" fue ACEPTADA por ',
      funcionario: 'Funcionario n°3',
      textoSecundario: '',
      fecha: 'Ju 09-04-2026 12:43 pm'
    },
    {
      id: 4,
      textoPrincipal: 'Tu solicitud "Solicitud inicial" fue vista por ',
      funcionario: 'Funcionario n°1',
      textoSecundario: ' y cambió a su estado a EN PROCESO',
      fecha: 'Mi 08-04-2026 23:43 pm'
    }
  ];

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
            {/* Puedes reemplazar '/assets/logo.png' con la ruta real de tu imagen cuando la tengas */}
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
                const rolActual = localStorage.getItem('rol_actual') || 'ciudadano';
                const nuevoRol = rolActual === 'ciudadano' ? 'funcionario' : 'ciudadano';
                localStorage.setItem('rol_actual', nuevoRol);
                window.dispatchEvent(new Event('rolCambiado'));
                window.location.href = nuevoRol === 'ciudadano' ? '/ciudadano/tramites' : '/funcionario/tramites'; 
              }}
              style={{ 
                backgroundColor: '#EDCA4E', 
                color: 'white', padding: '0 25px', 
                fontWeight: 'bold', fontSize: '0.9rem', height: '100%', 
                display: 'flex', alignItems: 'center', cursor: 'pointer' 
              }}>
              Rol: {localStorage.getItem('rol_actual') === 'funcionario' ? 'Funcionario Municipal' : 'Solicitante'}
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
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                backgroundColor: '#f4f5f8', borderRadius: '8px', padding: '15px 25px',
                border: '1px solid #eee'
              }}>
                
                {/* TEXTO DE LA IZQUIERDA CON EL FUNCIONARIO EN AZUL */}
                <span style={{ color: '#333', fontSize: '0.95rem', fontWeight: '500' }}>
                  {noti.textoPrincipal}
                  <span style={{ color: '#0da6f2', fontWeight: 'bold', cursor: 'pointer' }}>{noti.funcionario}</span>
                  {noti.textoSecundario}
                </span>

                {/* ZONA DE LA DERECHA (Fecha y Botón Amarillo) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ color: '#555', fontSize: '0.9rem', fontWeight: '500' }}>
                    {noti.fecha}
                  </span>
                  
                  <div 
                    title="Ver Detalle"
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

        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotificacionesCiudadano;