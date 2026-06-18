import React, { useMemo, useState } from "react";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { refreshOutline } from "ionicons/icons";

import type { Solicitud } from "../../../solicitudes/domain/entities/Solicitud";
import {
  filtrarHistorialFuncionario,
  type FiltrosHistorialFuncionarioDatos,
} from "../../../solicitudes/domain/rules/filtrarHistorialFuncionario";

interface Props {
  solicitudes: Solicitud[];
  onFiltrar: (solicitudes: Solicitud[]) => void;
  onRecargar: () => Promise<Solicitud[]>;
}

const FiltrosHistorialFuncionario: React.FC<Props> = ({
  solicitudes,
  onFiltrar,
  onRecargar,
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

  const filtrosVacios = () => {
    return (
      !filtroId.trim() &&
      !filtroTipo &&
      !ordenFecha &&
      !filtroCliente.trim() &&
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

    const filtros: FiltrosHistorialFuncionarioDatos = {
      id: filtroId,
      tipo: filtroTipo,
      ordenFecha,
      cliente: filtroCliente,
      estado: filtroEstado,
      titulo: filtroTitulo,
    };

    onFiltrar(filtrarHistorialFuncionario(baseActualizada, filtros));
  };

  const limpiar = async () => {
    setFiltroId("");
    setFiltroTipo("");
    setOrdenFecha("");
    setFiltroCliente("");
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
          gridTemplateColumns: "200px 400px 1fr auto",
          gap: "28px",
          marginBottom: "15px",
          alignItems: "end",
        }}
      >
        <div>
          <label style={estiloEtiqueta}>Nro. Solicitud</label>
          <IonInput
            value={filtroId}
            onIonChange={(e) => setFiltroId(e.detail.value || "")}
            style={estiloCampo}
          />
        </div>

        <div>
          <style>{`.custom-select-popover1 {--width: 400px;}`}</style>
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
            interfaceOptions={{
              cssClass: "custom-select-popover1",
              alignment: 'start',
              matchWidth: true,
            }}
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
          <style>{`.custom-select-popover2 {--width: 150px;}`}</style>
          <label style={estiloEtiqueta}>Fecha solicitud</label>
          <IonSelect
            interface="popover"
            value={ordenFecha}
            onIonChange={(e) => setOrdenFecha(e.detail.value || "")}
            placeholder="Seleccione..."
            style={estiloCampo}
            interfaceOptions={{
              cssClass: "custom-select-popover2",
              alignment: 'start',
              matchWidth: true,
            }}
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
          display: "grid",
          gridTemplateColumns: "190px 1fr auto",
          gap: "38px",
          alignItems: "end",
        }}
      >
        <div style={{ width: "200px" }}>
          <style>{`.custom-select-popover3 {--width: 200px;}`}</style>
          <label style={estiloEtiqueta}>Estado</label>
          <IonSelect
            interface="popover"
            value={filtroEstado}
            onIonChange={(e) => setFiltroEstado(e.detail.value || "")}
            placeholder="Seleccione..."
            style={estiloCampo}
            interfaceOptions={{
              cssClass: "custom-select-popover3",
              alignment: 'start',
              matchWidth: true,
            }}
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

export default FiltrosHistorialFuncionario;