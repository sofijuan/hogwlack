import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './VerifyAccount.css'; // Estilos adaptados para el componente

const VerifyAccount = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      const notify = (message) => toast.success(message);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify/${token}`,
        {
          method: 'GET'
        }
      );
      if (response.ok) {
        notify(
          'Tu cuenta ha sido verificada correctamente. Ya podes ingresar!'
        );
        navigate('/login');
      } else {
        setError('Hubo un error al validar la cuenta, intente nuevamente');
      }
    };
    verifyToken();
  }, []);

  return (
    <div className="verify-account">
      <div className="verify-account-container">
        <h1 className="verify-account-main-title">{error}</h1>
      </div>
    </div>
  );
};

export default VerifyAccount;
