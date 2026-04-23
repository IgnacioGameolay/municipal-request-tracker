import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon, 
  IonMenuButton 
} from '@ionic/react';
import { notificationsOutline, personCircleOutline } from 'ionicons/icons';

const DetalleSolicitud: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [solicitud, setSolicitud] = useState<any>(null);

  useEffect(() => {
    const dataGuardada = localStorage.getItem('solicitudes_db');
    if (dataGuardada) {
      const solicitudes = JSON.parse(dataGuardada);
      const soliEncontrada = solicitudes.find((s: any) => s.id.toString() === id);
      setSolicitud(soliEncontrada);
    }
  }, [id]);

  if (!solicitud) return <IonPage><IonContent>Cargando...</IonContent></IonPage>;

  const getColorEstado = (estado: string) => {
    switch(estado.toLowerCase()) {
      case 'pendiente': return { bg: '#ff3b30', text: 'white' };
      case 'en proceso': return { bg: '#ffcc00', text: '#333' };
      case 'finalizada': return { bg: '#34c759', text: 'white' };
      case 'rechazada': return { bg: '#ff3b30', text: 'white' }; 
      case 'anulada': return { bg: '#8e8e93', text: 'white' };
      default: return { bg: '#e0e0e0', text: '#333' };
    }
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

      <IonContent style={{ '--background': '#ffffff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '30px', paddingBottom: '30px', paddingLeft: '20px', paddingRight: '20px' }}>
          
          <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '20px', fontSize: '1.5rem' }}>
            Información de la solicitud
          </h2>

          <div style={{ backgroundColor: '#f4f5f8', borderRadius: '8px', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ display: 'block', fontSize: '0.85rem', color: '#000', marginBottom: '10px' }}>Estado</strong>
              <span style={{ backgroundColor: getColorEstado(solicitud.estado).bg, color: getColorEstado(solicitud.estado).text, padding: '4px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.75rem' }}>
                {solicitud.estado}
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ display: 'block', fontSize: '0.85rem', color: '#000', marginBottom: '10px' }}>Encargado</strong>
              <span style={{ fontSize: '0.85rem', color: '#555' }}>{solicitud.encargado}</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ display: 'block', fontSize: '0.85rem', color: '#000', marginBottom: '10px' }}>Última revisión</strong>
              <span style={{ fontSize: '0.85rem', color: '#555' }}>{solicitud.fecha}</span>
            </div>
          </div>

          <h3 style={{ color: '#000', fontWeight: 'bold', marginBottom: '15px', fontSize: '1.2rem' }}>
            Comentarios
          </h3>
          <div style={{ backgroundColor: '#f4f5f8', borderRadius: '8px', padding: '20px', marginBottom: '30px' }}>
            <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', padding: '20px', minHeight: '250px' }}>
              
              {solicitud.estado === 'Rechazada' || solicitud.estado === 'Pendiente' ? (
                <>
                  <p style={{ margin: '0 0 10px 0', color: '#333' }}>Falta documentación, específicamente:</p>
                  <p style={{ margin: '0 0 10px 0', color: '#333' }}>Documento n°1</p>
                  <p style={{ margin: '0 0 10px 0', color: '#333' }}>Documento n°2</p>
                  <p style={{ margin: '0 0 30px 0', color: '#333' }}>Cédula de identidad</p>
                  <p style={{ margin: 0, color: '#333' }}>Se canceló la solicitud por demora en la corrección</p>
                </>
              ) : (
                <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                  No hay observaciones registradas por el funcionario aún.
                </p>
              )}

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