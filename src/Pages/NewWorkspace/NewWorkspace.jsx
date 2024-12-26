import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './NewWorkspace.css';
import Header from '../../Components/Header/Header';

const NewWorkspace = () => {
  const navigate = useNavigate();

  const [workspaceName, setWorkspaceName] = useState('');
  const [channelName, setChannelName] = useState('');
  const [workspaceImage, setWorkspaceImage] = useState(null);

  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const notify = (message) => toast.success(message);

    const body = {
      name: workspaceName,
      channelName
    };

    if (workspaceImage) {
      body.image = workspaceImage;
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/workspaces`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
      }
    );

    navigate('/home');
  };

  const handleWorkspaceNameChange = (e) => {
    setWorkspaceName(e.target.value);
  };

  const handleChannelNameChange = (e) => {
    setChannelName(e.target.value);
  };

  const handleWorkspaceImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    // Cuando termine la lectura, guardamos el resultado en state
    reader.onloadend = () => {
      setWorkspaceImage(reader.result);
    };
    // Para convertirlo a Base64
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Header />
      <div className="new-workspace">
        <h1 className="new-workspace-title">Crea un entorno de trabajo</h1>
        <form className="new-workspace-form" onSubmit={handleFormSubmit}>
          <div className="new-workspace-inputs">
            <label>Nombre del entorno de trabajo</label>
            <input
              name="workspace"
              id="workspace"
              type="text"
              onChange={handleWorkspaceNameChange}
            />
            <label>Nombre del canal #</label>
            <input
              name="channel"
              id="channel"
              type="text"
              onChange={handleChannelNameChange}
            />
            {error ? (
              <span className="new-worspace-form-error">{error}</span>
            ) : (
              ''
            )}
            <input
              name="workspaceImage"
              id="workspaceImage"
              type="file"
              accept="image/*"
              onChange={handleWorkspaceImageChange}
            />
            {error ? (
              <span className="new-worspace-form-error">{error}</span>
            ) : (
              ''
            )}
          </div>
          <div className="new-workspace-form-buttons">
            <button
              className="btn-new-workspace"
              type="submit"
              disabled={!workspaceName || !channelName}
            >
              Crear entorno
            </button>
            <Link to="/home">
              <button className="btn-new-workspace">Cancelar</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewWorkspace;
