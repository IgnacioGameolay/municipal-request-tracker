import React from "react";
import { IonIcon } from "@ionic/react";
import { person } from "ionicons/icons";

const AvatarContactoFuncionario: React.FC = () => {
  return (
    <div
      style={{
        width: "90px",
        height: "100px",
        backgroundColor: "#a9a9a9",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        overflow: "hidden",
        marginBottom: "10px",
      }}
    >
      <IonIcon
        icon={person}
        style={{
          fontSize: "6rem",
          color: "#444",
          marginBottom: "-15px",
        }}
      />
    </div>
  );
};

export default AvatarContactoFuncionario;
