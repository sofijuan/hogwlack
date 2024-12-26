import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchWorkspace.css';
import useFetch from '../../hooks/useFetch';
import Context from '../../context/Context';

const SearchWorkspace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalData, setModalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchUrl, setSearchUrl] = useState(null);
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(Context);

  const fetchWorkspaces = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/workspaces/search?name=${searchTerm}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/JSON',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    const data = await response.json();

    return data;
  };

  const handleSearch = async () => {
    const data = await fetchWorkspaces();
    setModalData(data);
    setShowModal(true);
  };

  const handleJoinWorkspace = async (workspaceId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/workspaces/join/${workspaceId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/JSON',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.ok) {
        navigate('/home');
      }
    } catch (error) {}

    setShowModal(false);
  };

  const closeSession = () => {
    localStorage.removeItem('token');
    setLoggedUser(null);
    navigate('/login');
  };

  return (
    <div className="search-workspace">
      <header className="search-workspace-header">
        <h1 className="search-workspace-title">Hogwlack</h1>
        <div className="search-workspace-buttons">
          <button className="btn-exit" onClick={() => navigate('/home')}>
            Salir
          </button>
          <button className="btn-logout" onClick={() => closeSession()}>
            Cerrar Sesión
          </button>
        </div>
      </header>
      <div className="search-workspace-container">
        <h2 className="search-workspace-subtitle">Buscar entorno</h2>
        <div className="search-workspace-content">
          <input
            className="search-workspace-input"
            type="text"
            placeholder="Ingresa el nombre del workspace"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn-search"
            onClick={handleSearch}
            disabled={!searchTerm}
          >
            Buscar
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Resultados</h2>
            {modalData.length > 0 ? (
              modalData.map((workspace) => (
                <div key={workspace._id} className="modal-workspace-item">
                  <img
                    className="modal-workspace-img"
                    src={workspace.image}
                    alt={workspace.name}
                    width={'100px'}
                  />
                  <p className="modal-workspace-name">{workspace.name}</p>
                  <button
                    className="btn-join"
                    onClick={() => handleJoinWorkspace(workspace._id)}
                  >
                    Unirme
                  </button>
                </div>
              ))
            ) : (
              <p>No se encontraron workspaces</p>
            )}
            <button
              className="btn-back-to-search"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchWorkspace;
