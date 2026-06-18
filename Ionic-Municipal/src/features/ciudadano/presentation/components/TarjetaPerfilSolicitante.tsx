import React from "react";

import type { UsuarioApi } from "../../../auth/data/authApi";
import AvatarSolicitante from "./AvatarSolicitante";
import CampoDatoSolicitante from "./CampoDatoSolicitante";

interface Props {
  usuario: UsuarioApi;
}

function formatearRol(rol: UsuarioApi["rol"]): string {
  return rol === "funcionario" ? "Funcionario" : "Ciudadano";
}

const TarjetaPerfilSolicitante: React.FC<Props> = ({ usuario }) => {
  return (
    <div
      style={{
        backgroundColor: "#eeeeee",
        borderRadius: "8px",
        padding: "30px",
        marginBottom: "20px",
      }}
    >
      <h3
        style={{
          color: "#666",
          marginTop: 0,
          marginBottom: "25px",
          fontSize: "1.1rem",
        }}
      >
        Datos personales
      </h3>

      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        <AvatarSolicitante />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
            flex: 1,
            minWidth: "500px",
          }}
        >
          <CampoDatoSolicitante etiqueta="Nombre" valor={usuario.nombre} />
          <CampoDatoSolicitante etiqueta="RUT" valor={usuario.rut} />
          <CampoDatoSolicitante etiqueta="Email" valor={usuario.email} />
          <CampoDatoSolicitante etiqueta="Región" valor={usuario.region} />
          <CampoDatoSolicitante etiqueta="Comuna" valor={usuario.comuna} />
          <CampoDatoSolicitante etiqueta="Rol" valor={formatearRol(usuario.rol)} />
        </div>
      </div>
    </div>
  );
};

export default TarjetaPerfilSolicitante;