import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SearchChannel.css';
import Header from '../../Components/Header/Header';
import Context from '../../context/Context';

const SearchChannel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalData, setModalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchUrl, setSearchUrl] = useState(null);
  const navigate = useNavigate();
  const { id_workspace } = useParams();
  const { setLoggedUser } = useContext(Context);

  const fetchChannels = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/workspaces/${id_workspace}/channels/search?name=${searchTerm}`,
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
    const data = await fetchChannels();
    setModalData(data);
    setShowModal(true);
  };

  const handleJoinChannel = async (workspaceId, channelId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/workspaces/${workspaceId}/channels/${channelId}/join`,
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
    <div className="search-channel">
      <header className="search-channel-header">
        <h1 className="search-channel-title">Hogwlack</h1>
        <div className="search-channel-buttons">
          <button className="btn-exit" onClick={() => navigate('/home')}>
            Salir
          </button>
          <button className="btn-logout" onClick={() => closeSession()}>
            Cerrar Sesión
          </button>
        </div>
      </header>
      <div className="search-channel-container">
        <h2 className="search-channel-subtitle">Buscar canal</h2>
        <div>
          <input
            className="search-channel-input"
            type="text"
            placeholder="Ingresa el nombre del channel"
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
              modalData.map((channel) => (
                <div key={channel._id} className="modal-channel-item">
                  <p className="modal-channel-name">{channel.name}</p>
                  <button
                    className="btn-join"
                    onClick={() => handleJoinChannel(id_workspace, channel._id)}
                  >
                    Unirme
                  </button>
                </div>
              ))
            ) : (
              <p>No se encontraron channels</p>
            )}
            <button
              className="btn-back-to-search"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchChannel;
