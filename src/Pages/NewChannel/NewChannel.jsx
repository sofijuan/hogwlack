import React, { useState } from 'react';
import './NewChannel.css';
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../Components/Header/Header';

const NewChannel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id_workspace } = useParams('id_workspace');

  const [channelName, setChannelName] = useState('');

  const [error, setError] = useState('');

  const notify = (message) => toast.success(message);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const body = {
      channelName
    };

    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/workspaces/${id_workspace}/channels`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
      }
    );

    if (response.ok) {
      navigate('/home');

      notify(`Nuevo canal '${channelName}' creado!`);
      navigate(previousPath);
    }
  };

  const handleChannelNameChange = (e) => {
    setChannelName(e.target.value);
  };

  const previousPath = location.state?.previousPath || '/';

  return (
    <>
      <Header />
      <div className="new-channel">
        <h1 className="new-channel-title">Crear canal</h1>
        <form className="new-channel-form" onSubmit={handleFormSubmit}>
          <input
            name="channel"
            id="channel"
            type="text"
            placeholder="Nombre del canal"
            onChange={handleChannelNameChange}
          />
          {error ? <span className="new-channel-form-error">{error}</span> : ''}
          <div className="new-channel-submit-and-cancel">
            <button type="submit" disabled={!channelName}>
              CONFIRMAR
            </button>
            <Link to={previousPath}>
              <button className="btn-new-channel">CANCELAR</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewChannel;
