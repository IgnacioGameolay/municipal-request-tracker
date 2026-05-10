import React from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon, 
  IonMenuButton 
} from '@ionic/react';
import { notificationsOutline, personCircleOutline, person } from 'ionicons/icons';

const ContactoCiudadano: React.FC = () => {
  
  // Datos simulados idénticos a tu diseño de Figma
  const funcionarios = [
    { id: 1, nombre: 'Funcionario n°1', telefono: '+56 9 1234 5678', email: 'correoinstitucional1@gmail.com' },
    { id: 2, nombre: 'Funcionario n°2', telefono: '+56 9 5678 1234', email: 'correoinstitucional2@gmail.com' },
    { id: 3, nombre: 'Funcionario n°3', telefono: '+56 9 3232 5328', email: 'correoinstitucional3@gmail.com' },
    { id: 4, nombre: 'Funcionario n°4', telefono: '+56 9 4444 2222', email: 'correoinstitucional4@gmail.com' },
  ];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        {/* Cabecera con Azul Cielo */}
        <IonToolbar style={{ '--background': '#0084D8', color: 'white', '--padding-end': '0', '--min-height': '56px' }}>
          <IonButtons slot="start">
            <IonMenuButton style={{ color: 'white' }} />
          </IonButtons>
          
          {/* LOGO Y TÍTULO */}
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
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '30px', paddingBottom: '30px', paddingLeft: '20px', paddingRight: '20px' }}>
          
          <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '25px', fontSize: '1.6rem' }}>
            Contacto
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {funcionarios.map((func) => (
              <div key={func.id} style={{ 
                backgroundColor: '#eeeeee', borderRadius: '8px', padding: '25px', 
                display: 'flex', gap: '40px', alignItems: 'center' 
              }}>
                
                {/* LADO IZQUIERDO: Avatar y Nombre debajo */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '130px' }}>
                  <div style={{
                    width: '90px', height: '100px', backgroundColor: '#a9a9a9',
                    borderRadius: '8px', display: 'flex', justifyContent: 'center', 
                    alignItems: 'flex-end', overflow: 'hidden', marginBottom: '10px'
                  }}>
                    <IonIcon icon={person} style={{ fontSize: '6rem', color: '#444', marginBottom: '-15px' }} />
                  </div>
                  <span style={{ color: '#555', fontSize: '0.95rem', fontWeight: '500', textAlign: 'center' }}>
                    {func.nombre}
                  </span>
                </div>

                {/* LADO DERECHO: Cuadrícula de Información */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flex: 1 }}>
                  <div>
                    <strong style={{ display: 'block', color: '#333', marginBottom: '5px' }}>Nombre</strong>
                    <span style={{ color: '#666' }}>{func.nombre}</span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#333', marginBottom: '5px' }}>Teléfono</strong>
                    <span style={{ color: '#666' }}>{func.telefono}</span>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <strong style={{ display: 'block', color: '#333', marginBottom: '5px' }}>Email Institucional</strong>
                    <span style={{ color: '#666' }}>{func.email}</span>
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

export default ContactoCiudadano;