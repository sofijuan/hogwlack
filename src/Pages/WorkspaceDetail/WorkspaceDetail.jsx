import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ListChannels from "../../Components/ListChannels/ListChannels";
import ListMessages from "../../Components/ListMessages/ListMessages";
import "./WorkspaceDetail.css";

const WorkspaceDetail = () => {
  const { id_workspace, id_channel } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const localStorageData = JSON.parse(localStorage.getItem("data"));
  const workspaces = localStorageData.workspaces;
  const userInfo = localStorageData.userInfo;

  const workspace = workspaces.find((w) => w.id === Number(id_workspace));
  if (!workspace)
    return (
      <>
        <div>Workspace no encontrado</div>
        <Link to="/">
          <button>Salir</button>
        </Link>
      </>
    );

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const addMessageToLocalStorage = (newMsg) => {
    workspace.channels
      .find((c) => c.id === Number(id_channel))
      .messages.push(newMsg);
    localStorage.setItem("data", JSON.stringify(localStorageData));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    const newMessageObject = {
      id: messages.length + 1,
      author: userInfo.name + " " + userInfo.lastname,
      imgAuthor: userInfo.imgProfile,
      date: new Date().toLocaleString(),
      text: newMessage,
    };

    setMessages([...messages, newMessageObject]);
    setNewMessage("");
    addMessageToLocalStorage(newMessageObject);
  };

  useEffect(() => {
    const channel = workspace.channels.find((c) => c.id === Number(id_channel));
    setMessages(channel ? channel.messages : []);
  }, [id_channel]);

  const goToNewChannel = () => {
    navigate("/new-channel", {
      state: { previousPath: location.pathname, workspaceId: workspace.id },
    });
  };

  return (
    <>
      <h2 className="workspace-detail-name">{workspace.name}</h2>
      <Link to="/">
        <button className="workspace-detail-btn-exit">Salir</button>
      </Link>
      <div className="workspace-detail">
        <div className="channels">
          <ListChannels channels={workspace.channels} />
          <button className="workspace-detail-btn" onClick={goToNewChannel}>
            Crear canal
          </button>
        </div>
        <div className="messages">
          <ListMessages messages={messages} />
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Escribe aquí tu mensaje"
              value={newMessage}
              onChange={handleNewMessageChange}
            />
            <button className="workspace-detail-btn" disabled={!newMessage}>
              Enviar
            </button>
          </form>
          <ToastContainer
            position="bottom-right"
            pauseOnHover
            draggable
            theme="dark"
          />
        </div>
      </div>
    </>
  );
};
export default WorkspaceDetail;
