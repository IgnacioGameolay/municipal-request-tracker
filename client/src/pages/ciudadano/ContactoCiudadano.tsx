import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';

import EncabezadoAplicacion from '../../components/common/EncabezadoAplicacion';
import ContenedorPagina from '../../components/common/ContenedorPagina';
import ListaContactosFuncionarios from '../../components/ciudadano/ListaContactosFuncionarios';

import { contactosFuncionariosSimulados } from '../../infraestructura/simulacionDatos/contactosFuncionariosSimulados';

const ContactoCiudadano: React.FC = () => {
  const history = useHistory();

  const cambiarRolManual = () => {
    localStorage.setItem('rol_actual', 'funcionario');
    window.dispatchEvent(new Event('rolCambiado'));
    history.push('/funcionario/tramites');
  };

  return (
    <IonPage>
      <EncabezadoAplicacion
        rol="solicitante"
        rutaNotificaciones="/ciudadano/notificaciones"
        rutaPerfil="/ciudadano/tramites"
        onNavegar={(ruta) => history.push(ruta)}
        permitirCambioManualRol
        onCambiarRolManual={cambiarRolManual}
      />

      <IonContent style={{ '--background': '#ffffff' }}>
        <ContenedorPagina>
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              paddingTop: '30px',
              paddingBottom: '30px'
            }}
          >
            <h2
              style={{
                color: '#000',
                fontWeight: 'bold',
                marginBottom: '25px',
                fontSize: '1.6rem'
              }}
            >
              Contacto
            </h2>

            <ListaContactosFuncionarios
              funcionarios={contactosFuncionariosSimulados}
            />
          </div>
        </ContenedorPagina>
      </IonContent>
    </IonPage>
  );
};

export default ContactoCiudadano;