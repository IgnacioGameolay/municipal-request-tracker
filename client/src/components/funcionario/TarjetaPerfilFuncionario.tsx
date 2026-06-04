import React from "react";

import type { UsuarioApi } from "../../services/authApi";
import AvatarFuncionario from "./AvatarFuncionario";
import CampoDatoFuncionario from "./CampoDatoFuncionario";

interface Props {
  usuario: UsuarioApi;
}

function formatearRol(rol: UsuarioApi["rol"]): string {
  return rol === "funcionario" ? "Funcionario" : "Ciudadano";
}

const TarjetaPerfilFuncionario: React.FC<Props> = ({ usuario }) => {
  return (
    <div
      style={{
        backgroundColor: "#eeeeee",
        borderRadius: "8px",
        padding: "30px",
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
        <AvatarFuncionario />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
            flex: 1,
          }}
        >
          <CampoDatoFuncionario etiqueta="Nombre" valor={usuario.nombre} />
          <CampoDatoFuncionario etiqueta="RUT" valor={usuario.rut} />
          <CampoDatoFuncionario etiqueta="Email" valor={usuario.email} />
          <CampoDatoFuncionario etiqueta="Región" valor={usuario.region} />
          <CampoDatoFuncionario etiqueta="Comuna" valor={usuario.comuna} />
          <CampoDatoFuncionario etiqueta="Rol" valor={formatearRol(usuario.rol)} />
        </div>
      </div>
    </div>
  );
};

export default TarjetaPerfilFuncionario;