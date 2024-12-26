import React, { useState } from 'react';
import './ForgotPassword.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notify = (message) => toast.success(message);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        })
      }
    );

    if (response.ok) {
      notify(
        'Enviamos un email, por favor resetee su contraseña a través del mismo'
      );
      navigate('/');
    }
  };

  return (
    <div className="forgot-password">
      <h1 className="forgot-password-main-title">Hogwlack</h1>
      <div className="forgot-password-container">
        <h2 className="forgot-password-title">Recuperar contraseña</h2>
        <p className="forgot-password-description">
          Ingresa tu correo electrónico para recibir un enlace de recuperación.
        </p>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            required
            className="forgot-password-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="forgot-password-button">
            Enviar enlace de recuperación
          </button>
        </form>
        <div className="forgot-password-back-to-login">
          ¿Recordaste tu contraseña?{' '}
          <Link to="/login">
            <span className="forgot-password-link">Iniciar sesión</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
