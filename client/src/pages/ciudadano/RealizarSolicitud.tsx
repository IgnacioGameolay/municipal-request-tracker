import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon,
  IonMenuButton, IonInput, IonSelect, IonSelectOption, IonButton, IonTextarea
} from '@ionic/react';
import { notificationsOutline, personCircleOutline, documentOutline, pushOutline } from 'ionicons/icons';

interface Solicitud {
  id: number;
  titulo: string;
  encargado: string;
  fecha: string;
  estado: string;
  tipo?: string;
  descripcion?: string;
}

const RealizarSolicitud: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const esEdicion = !!id;

  const [tipo, setTipo] = useState('Tipo 1');
  const [titulo, setTitulo] = useState('');
  const [descripcionOriginal, setDescripcionOriginal] = useState('');
  const [descripcionAgregada, setDescripcionAgregada] = useState('');

  useEffect(() => {
    if (esEdicion) {
      const dataGuardada = localStorage.getItem('solicitudes_db');
      if (dataGuardada) {
        const db: Solicitud[] = JSON.parse(dataGuardada);
        const solicitudEncontrada = db.find(s => s.id.toString() === id);
        if (solicitudEncontrada) {
          setTitulo(solicitudEncontrada.titulo);
          setTipo(solicitudEncontrada.tipo || 'Tipo 1');
          setDescripcionOriginal(solicitudEncontrada.descripcion || 'Esta es la descripción de la solicitud original. Para motivos de transparencia, no se puede editar lo que ya fue enviado, sino que solo tiene permitido agregar más información.');
        }
      }
    }
  }, [id, esEdicion]);

  const manejarGuardar = () => {
    const dataGuardada = localStorage.getItem('solicitudes_db');
    let db: Solicitud[] = [];

    // 1. Cargamos la base de datos si existe
    if (dataGuardada) {
      db = JSON.parse(dataGuardada);
    }

    if (esEdicion) {
      // --- LÓGICA DE EDICIÓN ---
      const index = db.findIndex(s => s.id.toString() === id);

      if (index !== -1) {
        if (descripcionAgregada.trim() !== '') {
          db[index].descripcion = descripcionOriginal + '\n\n[Agregado el ' + new Date().toLocaleDateString() + ']: ' + descripcionAgregada;
        }
      }
    } else {
      // --- LÓGICA DE CREACIÓN (¡Esto era lo que faltaba!) ---
      const formatearFechaActual = () => {
        const fecha = new Date();

        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();

        let hora = fecha.getHours();
        const minutos = String(fecha.getMinutes()).padStart(2, '0');
        const periodo = hora >= 12 ? 'pm' : 'am';

        hora = hora % 12;
        hora = hora === 0 ? 12 : hora;

        return `${dia}-${mes}-${anio} ${String(hora).padStart(2, '0')}:${minutos} ${periodo}`;
      };
      
      const nuevaSolicitud: Solicitud = {
        id: Math.floor(Math.random() * 1000) + 1, // Generamos un ID aleatorio para el prototipo
        titulo: titulo || 'Sin título',
        encargado: 'Por asignar',

        // Obtenemos la fecha actual en formato dd-mm-yyyy
        fecha: new Date().toLocaleDateString('es-CL').replace(/\//g, '-'),

        estado: 'Pendiente', // Por defecto entra como pendiente
        tipo: tipo,
        descripcion: descripcionOriginal
      };

      // Agregamos la nueva solicitud a la lista
      db.push(nuevaSolicitud);
    }

    // 3. Guardamos la base de datos actualizada en el navegador
    localStorage.setItem('solicitudes_db', JSON.stringify(db));

    // 4. Redirigimos al historial
    history.push('/ciudadano/historial');
  };

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
                const rolActual = localStorage.getItem('rol_actual') || 'ciudadano';
                const nuevoRol = rolActual === 'ciudadano' ? 'funcionario' : 'ciudadano';
                localStorage.setItem('rol_actual', nuevoRol);
                window.dispatchEvent(new Event('rolCambiado'));
                window.location.href = nuevoRol === 'ciudadano' ? '/ciudadano/tramites' : '/funcionario/tramites';
              }}
              style={{ backgroundColor: '#EDCA4E', color: 'white', padding: '0 25px', fontWeight: 'bold', fontSize: '0.9rem', height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              Rol: {localStorage.getItem('rol_actual') === 'funcionario' ? 'Funcionario Municipal' : 'Solicitante'}
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#ffffff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '30px', paddingBottom: '50px', paddingLeft: '20px', paddingRight: '20px' }}>

          <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '20px', fontSize: '1.8rem' }}>
            {esEdicion ? 'Editar solicitud' : 'Realizar nueva solicitud'}
          </h2>

          <div style={{ backgroundColor: '#f4f5f8', borderRadius: '8px', padding: '30px', border: '1px solid #e0e0e0' }}>

            {/* TIPO DE SOLICITUD */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#333', marginBottom: '8px', fontWeight: '500' }}>Tipo de solicitud</label>
              <IonSelect
                interface="popover"
                value={tipo}
                onIonChange={e => setTipo(e.detail.value!)}
                disabled={esEdicion}
                style={{
                  backgroundColor: esEdicion ? '#d3d3d3' : '#fff',
                  border: '1px solid #ccc', borderRadius: '4px', minHeight: '40px', width: '200px', paddingLeft: '10px'
                }}
              >
                <IonSelectOption value="Tipo 1">Tipo 1</IonSelectOption>
                <IonSelectOption value="Tipo 2">Tipo 2</IonSelectOption>
                <IonSelectOption value="Tipo 3">Tipo 3</IonSelectOption>
                {/* AQUÍ ESTÁ EL TIPO 4 AGREGADO */}
                <IonSelectOption value="Tipo 4">Tipo 4</IonSelectOption>
              </IonSelect>
            </div>

            {/* TÍTULO */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#333', marginBottom: '8px', fontWeight: '500' }}>Título de la solicitud</label>
              <IonInput
                value={titulo}
                onIonChange={e => setTitulo(e.detail.value!)}
                disabled={esEdicion}
                style={{
                  backgroundColor: esEdicion ? '#d3d3d3' : '#fff',
                  border: '1px solid #ccc', borderRadius: '4px', minHeight: '40px', paddingLeft: '10px', color: esEdicion ? '#555' : '#000'
                }}
              />
            </div>

            {/* DESCRIPCIONES CONDICIONALES */}
            {esEdicion ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#333', marginBottom: '8px', fontWeight: '500' }}>Descripción de la solicitud</label>
                  <textarea
                    value={descripcionOriginal}
                    disabled
                    style={{
                      width: '100%', height: '200px', backgroundColor: '#d3d3d3', border: '1px solid #ccc',
                      borderRadius: '4px', padding: '10px', resize: 'none', color: '#555', fontFamily: 'inherit'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#333', marginBottom: '8px', fontWeight: '500' }}>Agregar a la descripción de la solicitud</label>
                  <textarea
                    placeholder="(Descripción agregada) Faltó incluir unos documentos, los adjunto ahora."
                    value={descripcionAgregada}
                    onChange={e => setDescripcionAgregada(e.target.value)}
                    style={{
                      width: '100%', height: '200px', backgroundColor: '#fff', border: '1px solid #ccc',
                      borderRadius: '4px', padding: '10px', resize: 'none', color: '#000', fontFamily: 'inherit'
                    }}
                  />
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#333', marginBottom: '8px', fontWeight: '500' }}>Descripción de la solicitud</label>
                <textarea
                  value={descripcionOriginal}
                  onChange={e => setDescripcionOriginal(e.target.value)}
                  style={{
                    width: '100%', height: '150px', backgroundColor: '#fff', border: '1px solid #ccc',
                    borderRadius: '4px', padding: '10px', resize: 'none', color: '#000', fontFamily: 'inherit'
                  }}
                />
              </div>
            )}

            {/* DOCUMENTACIÓN */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#333', marginBottom: '15px', fontWeight: '500' }}>Documentación de la solicitud</label>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
                <IonButton fill="outline" style={{ '--color': '#333', '--border-color': '#ccc', textTransform: 'none', height: '40px' }}>
                  <IonIcon icon={pushOutline} slot="start" /> Subir archivo
                </IonButton>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <IonIcon icon={documentOutline} style={{ fontSize: '2.5rem', color: '#333' }} />
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginTop: '5px' }}>Permiso...</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <IonIcon icon={documentOutline} style={{ fontSize: '2.5rem', color: '#333' }} />
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginTop: '5px' }}>Datos p...</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#555', marginTop: '10px', display: 'flex', gap: '5px' }}>
                <span>*</span> La falta de documentación puede llevar a la posterior anulación de la solicitud.
              </p>
            </div>

            {/* BOTONES FINALES */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={manejarGuardar}
                  style={{
                    backgroundColor: '#68cc24',
                    color: 'white', fontWeight: 'bold', fontSize: '1.1rem',
                    border: 'none', borderRadius: '4px', padding: '15px 40px',
                    cursor: 'pointer', width: '300px'
                  }}
                >
                  {esEdicion ? 'Editar Solicitud' : 'Enviar Solicitud'}
                </button>
              </div>
              <button
                onClick={() => history.goBack()}
                style={{
                  background: 'none', border: 'none', color: '#555',
                  fontSize: '1rem', cursor: 'pointer', textDecoration: 'none'
                }}
              >
                Volver
              </button>
            </div>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RealizarSolicitud;