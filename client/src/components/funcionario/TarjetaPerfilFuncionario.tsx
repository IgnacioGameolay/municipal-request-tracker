import React from "react";

import { Funcionario } from "../../dominio/entidades/Funcionario";
import AvatarFuncionario from "./AvatarFuncionario";
import CampoDatoFuncionario from "./CampoDatoFuncionario";

interface Props {
  funcionario: Funcionario;
}

const TarjetaPerfilFuncionario: React.FC<Props> = ({ funcionario }) => {
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
          <CampoDatoFuncionario etiqueta="Nombre" valor={funcionario.nombre} />

          <CampoDatoFuncionario etiqueta="Rut" valor={funcionario.rut} />

          <CampoDatoFuncionario
            etiqueta="Teléfono"
            valor={funcionario.telefono}
          />

          <CampoDatoFuncionario
            etiqueta="Email personal"
            valor={funcionario.emailPersonal}
          />

          <CampoDatoFuncionario
            etiqueta="Email Institucional"
            valor={funcionario.emailInstitucional}
            columnas={2}
          />

          <CampoDatoFuncionario
            etiqueta="ROL"
            valor={funcionario.rol}
            columnas={3}
          />
        </div>
      </div>
    </div>
  );
};

export default TarjetaPerfilFuncionario;
