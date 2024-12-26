import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ListChannels from '../../Components/ListChannels/ListChannels';
import ListMessages from '../../Components/ListMessages/ListMessages';
import './WorkspaceDetail.css';
import Context from '../../context/Context';

const WorkspaceDetail = () => {
  const { id_workspace, id_channel } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { workspace, setChannel, loggedUser, setLoggedUser } =
    useContext(Context);
  let { channel } = useContext(Context);

  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(`${import.meta.env.VITE_WS_URL}`);

    setWs(socket);

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);

      // Ajusta los nombres de workspaceId/channelId según tu caso
      if (
        receivedMessage.id_workspace === id_workspace &&
        receivedMessage.id_channel === id_channel
      ) {
        setChannel((prevChannel) => ({
          ...prevChannel,
          messages: [...prevChannel.messages, receivedMessage]
        }));
      }
    };

    // Limpiar conexión al desmontar
    return () => {
      socket.close();
    };
  }, []);

  if (!workspace)
    return (
      <>
        <div>Workspace no encontrado</div>
        <Link to="/">
          <button className="btn-exit">Salir</button>
        </Link>
      </>
    );

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const messageToSend = {
      content: newMessage,
      id_workspace: id_workspace,
      id_channel: id_channel,
      sender: loggedUser._id
    };

    ws.send(JSON.stringify(messageToSend));

    setNewMessage('');
  };

  const goToNewChannel = () => {
    navigate(`/workspace/${id_workspace}/new-channel`, {
      state: { previousPath: location.pathname, workspaceId: workspace._id }
    });
  };

  const goToSearchChannel = () => {
    navigate(`/workspace/${id_workspace}/search-channel`, {
      state: { previousPath: location.pathname, workspaceId: workspace._id }
    });
  };

  const closeSession = () => {
    localStorage.removeItem('token');
    setLoggedUser(null);
    navigate('/login');
  };

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="workspace-detail">
      <div className="workspace-detail-header">
        <h2 className="workspace-detail-name"># {workspace.name}</h2>
        <div className="btn-exit-and-hamburger">
          <Link to="/home">
            <button className="workspace-detail-btn-exit styled-btn">
              SALIR
            </button>
          </Link>
          <button
            className="workspace-detail-btn-exit styled-btn"
            onClick={() => closeSession()}
          >
            Cerrar sesión
          </button>
          <div
            className={`hamburger ${isOpen ? 'open' : ''}`}
            onClick={toggleCollapse}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
      </div>
      <div className="workspace-channels-and-messages">
        <div className={`channels ${isOpen ? 'open' : ''}`}>
          <ListChannels channels={workspace.channels} />
          <button
            className="workspace-detail-btn-create styled-btn"
            onClick={goToNewChannel}
          >
            CREAR CANAL
          </button>
          <button
            className="workspace-detail-btn-create styled-btn"
            onClick={goToSearchChannel}
          >
            BUSCAR CANAL
          </button>
        </div>
        <div className="messages">
          <ListMessages
            messages={channel.messages}
            loggedUserId={loggedUser._id}
          />
          <form onSubmit={handleSendMessage} className="workspace-detail-form">
            <input
              type="text"
              placeholder="Escribe aquí tu mensaje"
              value={newMessage}
              onChange={handleNewMessageChange}
            />
            <button
              className="workspace-detail-btn-send styled-btn"
              disabled={!newMessage}
            >
              ENVIAR
            </button>
          </form>
        </div>
        <ToastContainer
          position="bottom-right"
          pauseOnHover
          draggable
          theme="dark"
        />
      </div>
    </div>
  );
};
export default WorkspaceDetail;
