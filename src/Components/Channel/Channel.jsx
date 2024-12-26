import React, { useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Channel.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import Context from '../../context/Context';

const Channel = ({ id, name, owner }) => {
  const { id_workspace } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { setChannel } = useContext(Context);

  const notify = (message) => toast.success(message);

  const selectChannel = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/workspaces/${id_workspace}/channels/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    const channel = await response.json();

    setChannel(channel);
    navigate(`/workspace/${id_workspace}/${id}`);
  };

  const removeChannel = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/workspaces/${id_workspace}/channels/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (response.ok) {
      notify(`Channel eliminado correctamente`);
      window.location.reload();
    }
  };

  return (
    <div className="channel">
      <span
        className="channel-link"
        onClick={() => selectChannel()}
      >{`# ${name}`}</span>
      {owner && name !== 'general' && (
        <div className="channel-buttons">
          <FaEdit
            style={{ marginRight: '4px' }}
            onClick={() =>
              navigate(`/workspace/${id_workspace}/channel/${id}/edit`)
            }
          />
          <FaTrashAlt
            style={{ marginRight: '4px' }}
            onClick={() => setShowModal(true)}
          />
        </div>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Estás seguro que deseas eliminar el channel?</h3>
            <button
              className="btn-back-to-search"
              onClick={() => removeChannel()}
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
      <ToastContainer
        position="bottom-right"
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
};

export default Channel;
