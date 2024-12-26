import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notify = (message) => toast.success(message);

    if (!password || !confirmPassword) {
      setError('Por favor completar todos los campos');
    } else if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
    } else if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
    } else {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password/${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            password
          })
        }
      );
      if (response.ok) {
        setError('');
        notify('La contraseña fue actualizada correctamente');
        navigate('/login');
      }
    }
  };

  return (
    <div className="reset-password">
      <div className="reset-password-container">
        <h2>Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Guardar nueva contraseña</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
