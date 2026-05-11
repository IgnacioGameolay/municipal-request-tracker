import React from "react";

interface Props {
  documentos: string[];
}

const DocumentosRequeridosTramite: React.FC<Props> = ({ documentos }) => {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h3
        style={{
          fontSize: "1.1rem",
          fontWeight: "bold",
          marginBottom: "15px",
          color: "#000",
        }}
      >
        Documentos requeridos:
      </h3>

      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #999",
          borderRadius: "6px",
          width: "520px",
          minHeight: "210px",
          padding: "15px",
          color: "#222",
          lineHeight: "1.5",
        }}
      >
        {documentos.map((documento, index) => (
          <div key={`${documento}-${index}`}>- {documento}</div>
        ))}
      </div>
    </div>
  );
};

export default DocumentosRequeridosTramite;
