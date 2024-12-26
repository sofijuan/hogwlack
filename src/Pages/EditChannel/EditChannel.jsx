import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EditChannel.css';

const EditChannel = () => {
  const navigate = useNavigate();

  const [channelName, setChannelName] = useState('');
  const { id_channel } = useParams('id_channel');
  const { id_workspace } = useParams('id_workspace');

  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const notify = (message) => toast.success(message);

    const channelResponse = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/workspaces/${id_workspace}/channels/${id_channel}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    const channelData = await channelResponse.json();

    const body = {
      channelName: channelName ? channelName : channelData.name
    };

    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/workspaces/${id_workspace}/channels/${id_channel}`,
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
      navigate('/workspace/676bb59770fea8f329e64287/676bb59770fea8f329e64288');
    }
  };

  const handleChannelNameChange = (e) => {
    setChannelName(e.target.value);
  };

  return (
    <div className="edit-channel">
      <form className="edit-channel-form" onSubmit={handleFormSubmit}>
        <div className="edit-channel-inputs">
          <label>Nombre del channel</label>
          <input
            name="channelName"
            id="channel"
            type="text"
            onChange={handleChannelNameChange}
          />
        </div>
        <div className="edit-channel-form-buttons">
          <button
            className="btn-edit-channel"
            type="submit"
            disabled={!channelName}
          >
            Confirmar
          </button>
          <Link to="/home">
            <button className="btn-edit-channel">Cancelar</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditChannel;
