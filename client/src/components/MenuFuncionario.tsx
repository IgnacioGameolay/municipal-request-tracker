import React from 'react';
import {
  IonMenu, IonContent, IonList, IonItem, IonLabel, IonListHeader, IonMenuToggle,
  IonHeader, IonToolbar, IonTitle
} from '@ionic/react';

export const MenuFuncionario: React.FC = () => {
  return (
    <IonMenu menuId="menu-lateral" contentId="main-content" type="overlay">
      
      {/* Cabecera propia del menú */}
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': '#2b2d5c', color: 'white' }}>
          <IonTitle style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Menú Funcionario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        
        {/* SECCIÓN 1: Mi cuenta */}
        <IonListHeader style={{ backgroundColor: '#7377ad', color: 'white', minHeight: '30px', margin: 0, padding: '5px 15px', fontSize: '0.9rem' }}>
          Mi cuenta
        </IonListHeader>
        <IonList style={{ paddingTop: 0, paddingBottom: 0 }}>
          <IonMenuToggle autoHide={false}>
            <IonItem button routerLink="/funcionario/tramites" lines="none" style={{ '--min-height': '35px', fontSize: '0.9rem', color: '#555' }}>
              <IonLabel style={{ textDecoration: 'underline' }}>Perfil</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem button lines="none" style={{ '--min-height': '35px', fontSize: '0.9rem', color: '#555' }}>
              <IonLabel style={{ textDecoration: 'underline' }}>Datos funcionario</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>

        {/* SECCIÓN 2: Gestor de solicitudes */}
        <IonListHeader style={{ backgroundColor: '#7377ad', color: 'white', minHeight: '30px', margin: 0, padding: '5px 15px', fontSize: '0.9rem' }}>
          Gestor de solicitudes
        </IonListHeader>
        <IonList style={{ paddingTop: 0, paddingBottom: 0 }}>
          <IonMenuToggle autoHide={false}>
            <IonItem button routerLink="/funcionario/bandeja" lines="none" style={{ '--min-height': '35px', fontSize: '0.9rem', color: '#555' }}>
              <IonLabel style={{ textDecoration: 'underline' }}>Solicitudes</IonLabel>
            </IonItem>
          </IonMenuToggle>
          
          <IonMenuToggle autoHide={false}>
            {/* AGREGAMOS EL routerLink AQUÍ */}
            <IonItem button routerLink="/funcionario/historial" lines="none" style={{ '--min-height': '35px', fontSize: '0.9rem', color: '#555' }}>
              <IonLabel style={{ textDecoration: 'underline' }}>Historial</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>

        {/* SECCIÓN 3: Centro de Comunicación */}
        <IonListHeader style={{ backgroundColor: '#7377ad', color: 'white', minHeight: '30px', margin: 0, padding: '5px 15px', fontSize: '0.9rem' }}>
          Centro de Comunicación
        </IonListHeader>
        <IonList style={{ paddingTop: 0, paddingBottom: 0 }}>
          <IonMenuToggle autoHide={false}>
            <IonItem button lines="none" style={{ '--min-height': '35px', fontSize: '0.9rem', color: '#555' }}>
              <IonLabel style={{ textDecoration: 'underline' }}>Bandeja de notificaciones</IonLabel>
            </IonItem>
          </IonMenuToggle>
          
          <IonMenuToggle autoHide={false}>
            <IonItem button lines="none" style={{ '--min-height': '35px', fontSize: '0.9rem', color: '#555' }}>
              <IonLabel style={{ textDecoration: 'underline' }}>Contacto con solicitantes</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>

      </IonContent>
    </IonMenu>
  );
};