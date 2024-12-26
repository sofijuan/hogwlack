import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import Context from '../../context/Context';

const Header = () => {
  const { setLoggedUser } = useContext(Context);

  const navigate = useNavigate();

  const closeSession = () => {
    localStorage.removeItem('token');
    setLoggedUser(null);
    navigate('/login');
  };

  return (
    <header className="header-app">
      <h1 className="header-app-title">Hogwlack</h1>
      <div className="header-app-buttons">
        <button
          className="header-app-btn-logout"
          onClick={() => closeSession()}
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};

export default Header;
