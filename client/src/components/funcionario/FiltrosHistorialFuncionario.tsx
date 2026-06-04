import React, { useMemo, useState } from "react";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { refreshOutline } from "ionicons/icons";

import type { Solicitud } from "../../dominio/entidades/Solicitud";
import { filtrarHistorialFuncionario } from "../../aplicacion/casosDeUso/filtrarHistorialFuncionario";

import type { FiltrosHistorialFuncionarioDatos } from "../../aplicacion/casosDeUso/filtrarHistorialFuncionario";

interface Props {
  solicitudes: Solicitud[];
  onFiltrar: (solicitudes: Solicitud[]) => void;
}

const FiltrosHistorialFuncionario: React.FC<Props> = ({
  solicitudes,
  onFiltrar,
}) => {
  const [filtroId, setFiltroId] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [ordenFecha, setOrdenFecha] = useState("");
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroTitulo, setFiltroTitulo] = useState("");

  const tiposDisponibles = useMemo(() => {
    return Array.from(
      new Set(
        solicitudes
          .map((solicitud) => solicitud.tipo)
          .filter(
            (tipo): tipo is string =>
              typeof tipo === "string" && tipo.trim().length > 0,
          ),
      ),
    ).sort((a, b) => a.localeCompare(b, "es"));
  }, [solicitudes]);

  const buscar = () => {
    const filtros: FiltrosHistorialFuncionarioDatos = {
      id: filtroId,
      tipo: filtroTipo,
      ordenFecha,
      cliente: filtroCliente,
      estado: filtroEstado,
      titulo: filtroTitulo,
    };

    onFiltrar(filtrarHistorialFuncionario(solicitudes, filtros));
  };

  const limpiar = () => {
    setFiltroId("");
    setFiltroTipo("");
    setOrdenFecha("");
    setFiltroCliente("");
    setFiltroEstado("");
    setFiltroTitulo("");
    onFiltrar(solicitudes);
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
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "20px",
          marginBottom: "15px",
        }}
      >
        <div>
          <label style={estiloEtiqueta}>ID. Solicitud</label>

          <IonInput
            value={filtroId}
            onIonChange={(e) => setFiltroId(e.detail.value || "")}
            style={estiloCampo}
          />
        </div>

        <div>
          <label style={estiloEtiqueta}>Tipo de solicitud</label>

          <IonSelect
            interface="popover"
            value={filtroTipo}
            onIonChange={(e) => setFiltroTipo(e.detail.value || "")}
            placeholder={
              tiposDisponibles.length > 0
                ? "Seleccione..."
                : "Sin tipos disponibles"
            }
            style={estiloCampo}
            disabled={tiposDisponibles.length === 0}
          >
            <IonSelectOption value="">Todos</IonSelectOption>

            {tiposDisponibles.map((tipo) => (
              <IonSelectOption key={tipo} value={tipo}>
                {tipo}
              </IonSelectOption>
            ))}
          </IonSelect>
        </div>

        <div>
          <label style={estiloEtiqueta}>Fecha solicitud</label>

          <IonSelect
            interface="popover"
            value={ordenFecha}
            onIonChange={(e) => setOrdenFecha(e.detail.value || "")}
            placeholder="Seleccione orden..."
            style={estiloCampo}
          >
            <IonSelectOption value="recientes">Más recientes</IonSelectOption>
            <IonSelectOption value="antiguas">Más antiguas</IonSelectOption>
          </IonSelect>
        </div>

        <div>
          <label style={estiloEtiqueta}>Cliente</label>

          <IonInput
            value={filtroCliente}
            onIonChange={(e) => setFiltroCliente(e.detail.value || "")}
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
            <IonSelectOption value="Recibido">Recibido</IonSelectOption>
            <IonSelectOption value="En revisión">En revisión</IonSelectOption>
            <IonSelectOption value="Observado">Observado</IonSelectOption>
            <IonSelectOption value="Pendiente">Pendiente</IonSelectOption>
            <IonSelectOption value="Aprobada">Aprobada</IonSelectOption>
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
            onClick={buscar}
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
            onClick={limpiar}
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

export default FiltrosHistorialFuncionario;