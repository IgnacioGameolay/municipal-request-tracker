import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';

import EncabezadoAplicacion from '../../components/common/EncabezadoAplicacion';
import ContenedorPagina from '../../components/common/ContenedorPagina';
import SelectorTipoTramite from '../../components/ciudadano/SelectorTipoTramite';
import DocumentosRequeridosTramite from '../../components/ciudadano/DocumentosRequeridosTramite';
import ResumenInformacionTramite from '../../components/ciudadano/ResumenInformacionTramite';

import { informacionTramitesSimulados } from '../../infraestructura/simulacionDatos/informacionTramitesSimulados';

const InfoSolicitudes: React.FC = () => {
  const history = useHistory();

  const [tipoTramite, setTipoTramite] = useState('');

  const cambiarRolManual = () => {
    localStorage.setItem('rol_actual', 'funcionario');
    window.dispatchEvent(new Event('rolCambiado'));
    history.push('/funcionario/tramites');
  };

  const informacionSeleccionada =
    informacionTramitesSimulados.find(tramite => tramite.tipo === tipoTramite) ||
    informacionTramitesSimulados[0];

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
                fontSize: '1.8rem'
              }}
            >
              Información sobre solicitudes
            </h2>

            <div
              style={{
                backgroundColor: '#eeeeee',
                borderRadius: '8px',
                padding: '30px',
                color: '#000'
              }}
            >
              <SelectorTipoTramite
                tipos={informacionTramitesSimulados.map(tramite => tramite.tipo)}
                tipoSeleccionado={tipoTramite}
                onSeleccionarTipo={setTipoTramite}
              />

              <DocumentosRequeridosTramite
                documentos={informacionSeleccionada.documentos}
              />

              <ResumenInformacionTramite
                tiempoEstimado={informacionSeleccionada.tiempoEstimado}
                areaResponsable={informacionSeleccionada.areaResponsable}
              />
            </div>
          </div>
        </ContenedorPagina>
      </IonContent>
    </IonPage>
  );
};

export default InfoSolicitudes;