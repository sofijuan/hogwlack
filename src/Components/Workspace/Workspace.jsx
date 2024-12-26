import React, { useState, useContext } from 'react';
import './Workspace.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import Context from '../../context/Context';

const Workspace = ({ id, imgWorkspace, name, channels, owner }) => {
  const notify = (message) => toast.success(message);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { workspace, setWorkspace, channel, setChannel } = useContext(Context);

  const removeWorkspace = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (response.ok) {
      notify(`Workspace eliminado correctamente`);
      window.location.reload();
    }
  };

  const [general_channel] = channels.filter((c) => {
    return c.name === 'general';
  });

  const fetchWorkspace = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      setWorkspace(data);
    }
  };

  const fetchChannel = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/workspaces/${id}/channels/${
        general_channel._id
      }`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      setChannel(data);
    }
  };

  const goToWorkspaceDetail = async () => {
    await fetchWorkspace();
    await fetchChannel();

    navigate(`/workspace/${id}/${general_channel._id}`);
  };

  return (
    <div className="workspace">
      <div className="workspace-img-and-name">
        <img src={imgWorkspace} alt={name} className="workspace-image" />
        <span className="workspace-name">{name}</span>
      </div>
      {owner && (
        <Link to={`/workspace/${id}/edit`}>
          <button className="button-get-in">
            <FaEdit style={{ marginRight: '4px' }} />
          </button>
        </Link>
      )}
      {owner && (
        <button
          className="button-remove-workspace"
          onClick={() => setShowModal(true)}
        >
          <FaTrashAlt style={{ marginRight: '4px' }} />
        </button>
      )}
      <button className="button-get-in" onClick={() => goToWorkspaceDetail()}>
        ENTRAR
      </button>
      <ToastContainer
        position="bottom-right"
        pauseOnHover
        draggable
        theme="dark"
      />

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Estás seguro que deseas eliminar el workspace?</h3>
            <button
              className="btn-back-to-search"
              onClick={() => removeWorkspace()}
            >
              Confirmar
            </button>
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

export default Workspace;
