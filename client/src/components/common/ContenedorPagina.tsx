import React from "react";

interface Props {
  children: React.ReactNode;
}

const ContenedorPagina: React.FC<Props> = ({ children }) => {
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        paddingTop: "30px",
        paddingBottom: "30px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      {children}
    </div>
  );
};

export default ContenedorPagina;
