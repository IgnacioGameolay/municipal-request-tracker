import React, { useMemo, useState } from "react";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { refreshOutline } from "ionicons/icons";

import { Solicitud } from "../../dominio/entidades/Solicitud";
import { normalizarEstado } from "../../dominio/reglas/normalizarEstado";
import { obtenerMilisegundosFecha } from "../../dominio/reglas/formatearFecha";

interface Props {
  solicitudes: Solicitud[];
  onFiltrar: (solicitudes: Solicitud[]) => void;
  onRecargar: () => Promise<Solicitud[]>;
}

const FiltrarSolicitudes: React.FC<Props> = ({
  solicitudes,
  onFiltrar,
  onRecargar,
}) => {
  const [filtroId, setFiltroId] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [ordenFecha, setOrdenFecha] = useState("");
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
      !filtroEstado &&
      !filtroTitulo.trim()
    );
  };

  const aplicarFiltros = (base: Solicitud[]) => {
    let filtrado = [...base];

    if (filtroId.trim()) {
      filtrado = filtrado.filter((solicitud) =>
        solicitud.id.toString().includes(filtroId.trim()),
      );
    }

    if (filtroTipo) {
      filtrado = filtrado.filter((solicitud) => solicitud.tipo === filtroTipo);
    }

    if (filtroEstado) {
      filtrado = filtrado.filter(
        (solicitud) =>
          normalizarEstado(solicitud.estado) === normalizarEstado(filtroEstado),
      );
    }

    if (filtroTitulo.trim()) {
      filtrado = filtrado.filter((solicitud) =>
        solicitud.titulo.toLowerCase().includes(filtroTitulo.toLowerCase()),
      );
    }

    if (ordenFecha === "recientes") {
      filtrado.sort(
        (a, b) =>
          obtenerMilisegundosFecha(b.fecha) - obtenerMilisegundosFecha(a.fecha),
      );
    }

    if (ordenFecha === "antiguas") {
      filtrado.sort(
        (a, b) =>
          obtenerMilisegundosFecha(a.fecha) - obtenerMilisegundosFecha(b.fecha),
      );
    }

    return filtrado;
  };

  const manejarBusqueda = async () => {
    const baseActualizada = await onRecargar();

    if (filtrosVacios()) {
      onFiltrar(baseActualizada);
      return;
    }

    onFiltrar(aplicarFiltros(baseActualizada));
  };

  const limpiarFiltros = async () => {
    setFiltroId("");
    setFiltroTipo("");
    setOrdenFecha("");
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
        padding: "16px 24px",
        marginBottom: "20px",
        border: "1px solid #e0e0e0",
      }}
    >
      <h3
        style={{
          margin: "0 0 14px 0",
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
          gridTemplateColumns: "190px 190px 190px",
          gap: "38px",
          marginBottom: "18px",
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
            placeholder="Seleccione..."
            style={estiloCampo}
          >
            <IonSelectOption value="recientes">Más recientes</IonSelectOption>
            <IonSelectOption value="antiguas">Más antiguas</IonSelectOption>
          </IonSelect>
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
        <div>
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

        <div>
          <label style={estiloEtiqueta}>Título solicitud</label>

          <IonInput
            value={filtroTitulo}
            onIonChange={(e) => setFiltroTitulo(e.detail.value || "")}
            style={estiloCampo}
          />
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <IonButton
            onClick={() => void manejarBusqueda()}
            style={{
              "--background": "#0088ff",
              "--color": "white",
              textTransform: "none",
              fontWeight: "bold",
              height: "40px",
              margin: 0,
              width: "85px",
            }}
          >
            Buscar
          </IonButton>

          <IonButton
            onClick={() => void limpiarFiltros()}
            style={{
              "--background": "#ffcc00",
              "--color": "white",
              height: "40px",
              width: "52px",
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
  color: "#333",
  marginBottom: "5px",
};

const estiloCampo = {
  backgroundColor: "#fff",
  border: "1px solid #aaa",
  borderRadius: "6px",
  minHeight: "40px",
  width: "100%",
};

export default FiltrarSolicitudes;