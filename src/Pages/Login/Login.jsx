import React, { useState, useContext } from 'react';
import './Login.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Context from '../../context/Context';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setLoggedUser } = useContext(Context);

  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Aquí normalmente guardarías el token JWT en localStorage o sessionStorage
        localStorage.setItem('token', data.token);

        const responseMe = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        const dataMe = await responseMe.json();

        setLoggedUser(dataMe);

        // Redirigir al usuario a la página /home
        navigate('/home');
      } else {
        // Manejar errores de inicio de sesión
        setError(
          (data.errors && data.errors[0] && data.errors[0].msg) ||
            data.message ||
            'Error al iniciar sesión'
        );
      }
    } catch (err) {
      setError('Error de red. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // CSS para el spinner
  const spinnerStyle = {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#007bff', // Color de tu elección
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    animation: 'spin 1s linear infinite'
  };

  // Animación para el spinner
  const keyframesStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  // Estilos para el botón y el contenedor del texto/spinner
  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px' // Espacio entre el texto y el spinner
  };

  return (
    <div className="login">
      <style>{keyframesStyle}</style>
      <h2 className="login-main-title">Bienvenidos a Hogwlack</h2>
      <div className="login-container">
        <form className="login-form" onSubmit={handleFormSubmit}>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleEmailChange}
          />
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          {error ? <span className="login-form-error">{error}</span> : ''}
          <div className="login-submit-and-cancel">
            <button
              type="submit"
              disabled={!email || !password || loading}
              style={buttonStyle}
            >
              {loading ? (
                <>
                  <span>Iniciando sesión</span>
                  <div style={spinnerStyle}></div>
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>
        </form>
        <div className="login-register-container">
          <div className="login-register">
            ¿Nuevo en Hogwlack?{' '}
            <Link to="/register">
              <span className="login-register-link">Crear una cuenta</span>
            </Link>
          </div>
          <Link to="/forgot-password">
            <button className="login-forgot-password">
              Olvidé mi contraseña
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
};

export default Login;
