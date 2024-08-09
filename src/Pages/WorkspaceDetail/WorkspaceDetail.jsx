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
        <div>Workspace no en contrado</div>
        <Link to="/">
          <button className="btn-exit">Salir</button>
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="workspace-detail">
      <div className="workspace-detail-header">
        <h2 className="workspace-detail-name"># {workspace.name}</h2>
        <div className="btn-exit-and-hamburger">
          <Link to="/">
            <button className="workspace-detail-btn-exit styled-btn">
              SALIR
            </button>
          </Link>
          <div
            className={`hamburger ${isOpen ? "open" : ""}`}
            onClick={toggleCollapse}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
      </div>
      <div className="workspace-channels-and-messages">
        <div className={`channels ${isOpen ? "open" : ""}`}>
          <ListChannels channels={workspace.channels} />
          <button
            className="workspace-detail-btn-create styled-btn"
            onClick={goToNewChannel}
          >
            CREAR CANAL
          </button>
        </div>
        <div className="messages">
          <ListMessages messages={messages} />
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
