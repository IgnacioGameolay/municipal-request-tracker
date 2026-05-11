import React from 'react';
import { RolUsuario } from '../../dominio/constantes/roles';

interface Props {
  rol: RolUsuario;
  permitirCambioManual?: boolean;
  onClick?: () => void;
}

const BarraRol: React.FC<Props> = ({ rol, permitirCambioManual = false, onClick }) => {
  const esFuncionario = rol === 'funcionario';

  return (
    <div
      onClick={permitirCambioManual ? onClick : undefined}
      style={{
        backgroundColor: esFuncionario ? '#e53935' : '#EDCA4E',
        color: 'white',
        padding: '0 25px',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        cursor: permitirCambioManual ? 'pointer' : 'default'
      }}
    >
      {esFuncionario ? 'Rol: Funcionario Municipal' : 'Rol: Solicitante'}
    </div>
  );
};

export default BarraRol;