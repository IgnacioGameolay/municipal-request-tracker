import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';

import EncabezadoAplicacion from '../../components/common/EncabezadoAplicacion';
import ContenedorPagina from '../../components/common/ContenedorPagina';
import TarjetaPerfilSolicitante from '../../components/ciudadano/TarjetaPerfilSolicitante';
import TarjetaEmpresaSolicitante from '../../components/ciudadano/TarjetaEmpresaSolicitante';

import { solicitantesSimulados } from '../../infraestructura/simulacionDatos/solicitantesSimulados';

const DashboardCiudadano: React.FC = () => {
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
              maxWidth: '1100px',
              margin: '0 auto',
              paddingTop: '10px',
              paddingBottom: '40px'
            }}
          >
            <h2
              style={{
                color: '#000',
                fontWeight: 'bold',
                marginBottom: '20px',
                fontSize: '1.5rem'
              }}
            >
              Información personal
            </h2>

            <TarjetaPerfilSolicitante solicitante={solicitantesSimulados} />

            <h2
              style={{
                color: '#000',
                fontWeight: 'bold',
                marginTop: '15px',
                marginBottom: '15px',
                fontSize: '1.5rem'
              }}
            >
              Datos de empresa
            </h2>

            <TarjetaEmpresaSolicitante empresa={solicitantesSimulados.empresa} />
          </div>
        </ContenedorPagina>
      </IonContent>
    </IonPage>
  );
};

export default DashboardCiudadano;