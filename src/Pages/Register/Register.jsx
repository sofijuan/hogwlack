import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(''); // Almacena el link o archivo de la foto de perfil
  const [error, setError] = useState('');

  const runFormValidations = () => {
    let resultValidations = false;
    if (!username || !email || !password) {
      setError('Por favor, complete todos los campos');
    } else if (username && username.length < 5) {
      setError('El nombre de usuario debe tener 5 o más caracteres');
    } else if (password && password.length < 8) {
      setError('La contraseña debe tener 8 o más caracteres');
    } else {
      resultValidations = true;
    }
    return resultValidations;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notify = (message) => toast.success(message);

    const resultValidations = runFormValidations();
    if (resultValidations) {
      try {
        const body = {
          username,
          email,
          password
        };
        if (profileImage) {
          body.image = profileImage;
        }
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          }
        );
        if (!response.ok) {
          setError('Error al registrar usuario. Intentar mas tarde');
        } else {
          notify(
            'Enviamos un email, por favor verifique su cuenta a través del mismo'
          );
          navigate('/');
        }
      } catch (error) {
        setError(
          error.message
            ? error.message
            : 'Error al registrar usuario. Intentar mas tarde'
        );
      }
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    // Cuando termine la lectura, guardamos el resultado en state
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    // Para convertirlo a Base64
    reader.readAsDataURL(file);
  };

  return (
    <div className="register">
      <h1 className="register-main-title">Hogwlack</h1>
      <div className="register-container">
        <h2 className="register-title">Crear una cuenta</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          {error && <div className="register-form-error">{error}</div>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Campo para foto de perfil */}
          <label className="register-profile-label">Foto de perfil</label>
          <input
            name="profileImage"
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
          />

          <div className="register-submit-and-cancel">
            <button type="submit">Registrar</button>
          </div>
        </form>

        {/* Enlace para volver al Login */}
        <div className="register-login-link">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login">
            <span className="register-link">Inicia sesión aquí</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
