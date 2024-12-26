import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EditWorkspace.css';

const EditWorkspace = () => {
  const navigate = useNavigate();

  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceImage, setWorkspaceImage] = useState(null);
  const { id_workspace } = useParams('id_workspace');

  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const notify = (message) => toast.success(message);

    const workspaceResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${id_workspace}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    const workspaceData = await workspaceResponse.json();

    const body = {
      name: workspaceName ? workspaceName : workspaceData.name
    };

    if (workspaceImage) {
      body.image = workspaceImage;
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${id_workspace}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
      }
    );

    if (response.ok) {
      navigate('/home');
    }
  };

  const handleWorkspaceNameChange = (e) => {
    setWorkspaceName(e.target.value);
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
    <div className="edit-workspace">
      <form className="edit-workspace-form" onSubmit={handleFormSubmit}>
        <div className="edit-workspace-inputs">
          <label>Nombre del entorno de trabajo</label>
          <input
            name="workspaceName"
            id="workspace"
            type="text"
            onChange={handleWorkspaceNameChange}
          />
          <input
            name="workspaceImage"
            id="workspaceImage"
            type="file"
            accept="image/*"
            onChange={handleWorkspaceImageChange}
          />
          {error ? (
            <span className="edit-worspace-form-error">{error}</span>
          ) : (
            ''
          )}
        </div>
        <div className="edit-workspace-form-buttons">
          <button
            className="btn-edit-workspace"
            type="submit"
            disabled={!workspaceName && !workspaceImage}
          >
            Confirmar
          </button>
          <Link to="/home">
            <button className="btn-edit-workspace">Cancelar</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditWorkspace;
