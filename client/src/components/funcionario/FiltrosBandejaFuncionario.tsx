import React, { useState } from "react";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { refreshOutline } from "ionicons/icons";

import { Solicitud } from "../../dominio/entidades/Solicitud";
import {
  FiltrosFuncionario,
  filtrarSolicitudesFuncionario,
} from "../../aplicacion/casosDeUso/filtrarSolicitudesFuncionario";

interface Props {
  solicitudes: Solicitud[];
  onFiltrar: (solicitudes: Solicitud[]) => void;
  onRecargar: () => Promise<Solicitud[]>;
}

const FiltrosBandejaFuncionario: React.FC<Props> = ({
  solicitudes,
  onFiltrar,
  onRecargar,
}) => {
  const [filtroNro, setFiltroNro] = useState("");
  const [filtroIdentificador, setFiltroIdentificador] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroTitulo, setFiltroTitulo] = useState("");

  const filtrosVacios = () => {
    return (
      !filtroNro.trim() &&
      !filtroIdentificador.trim() &&
      !filtroFecha &&
      !filtroEstado &&
      !filtroTitulo.trim()
    );
  };

  const buscar = async () => {
    const baseActualizada = await onRecargar();

    if (filtrosVacios()) {
      onFiltrar(baseActualizada);
      return;
    }

    const filtros: FiltrosFuncionario = {
      nroSolicitud: filtroNro,
      identificador: filtroIdentificador,
      fecha: filtroFecha,
      estado: filtroEstado,
      titulo: filtroTitulo,
    };

    onFiltrar(filtrarSolicitudesFuncionario(baseActualizada, filtros));
  };

  const limpiar = async () => {
    setFiltroNro("");
    setFiltroIdentificador("");
    setFiltroFecha("");
    setFiltroEstado("");
    setFiltroTitulo("");

    const baseActualizada = await onRecargar();
    onFiltrar(baseActualizada);
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f5f8",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px",
        border: "1px solid #e0e0e0",
      }}
    >
      <h3
        style={{
          margin: "0 0 15px 0",
          fontSize: "1rem",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        Filtrar por
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
          marginBottom: "15px",
        }}
      >
        <div>
          <label style={estiloEtiqueta}>NRO. Solicitud</label>

          <IonInput
            value={filtroNro}
            onIonChange={(e) => setFiltroNro(e.detail.value || "")}
            style={estiloCampo}
          />
        </div>

        <div>
          <label style={estiloEtiqueta}>Identificador</label>

          <IonInput
            value={filtroIdentificador}
            onIonChange={(e) => setFiltroIdentificador(e.detail.value || "")}
            style={estiloCampo}
          />
        </div>

        <div>
          <label style={estiloEtiqueta}>Fecha solicitud</label>

          <IonInput
            type="date"
            value={filtroFecha}
            onIonChange={(e) => setFiltroFecha(e.detail.value || "")}
            style={estiloCampo}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-end",
        }}
      >
        <div style={{ width: "200px" }}>
          <label style={estiloEtiqueta}>Estado</label>

          <IonSelect
            interface="popover"
            value={filtroEstado}
            onIonChange={(e) => setFiltroEstado(e.detail.value || "")}
            placeholder="Seleccione..."
            style={estiloCampo}
          >
            <IonSelectOption value="">Todos</IonSelectOption>
            <IonSelectOption value="Pendiente">Pendiente</IonSelectOption>
            <IonSelectOption value="En revisión">En revisión</IonSelectOption>
            <IonSelectOption value="Resuelta">Resuelta</IonSelectOption>
            <IonSelectOption value="Rechazada">Rechazada</IonSelectOption>
          </IonSelect>
        </div>

        <div style={{ flex: 1 }}>
          <label style={estiloEtiqueta}>Título solicitud</label>

          <IonInput
            value={filtroTitulo}
            onIonChange={(e) => setFiltroTitulo(e.detail.value || "")}
            style={estiloCampo}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <IonButton
            onClick={() => void buscar()}
            style={{
              "--background": "#0088ff",
              "--color": "white",
              textTransform: "none",
              fontWeight: "bold",
              height: "35px",
              margin: 0,
            }}
          >
            Buscar
          </IonButton>

          <IonButton
            onClick={() => void limpiar()}
            style={{
              "--background": "#ffcc00",
              "--color": "white",
              height: "35px",
              width: "45px",
              margin: 0,
            }}
          >
            <IonIcon icon={refreshOutline} style={{ fontSize: "1.2rem" }} />
          </IonButton>
        </div>
      </div>
    </div>
  );
};

const estiloEtiqueta = {
  display: "block",
  fontSize: "0.85rem",
  color: "#555",
  marginBottom: "5px",
};

const estiloCampo = {
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderRadius: "4px",
  minHeight: "35px",
  width: "100%",
};

export default FiltrosBandejaFuncionario;