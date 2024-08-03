import React, { useState } from "react";
import "./NewChannel.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewChannel = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [channelName, setChannelName] = useState("");

  const [error, setError] = useState("");

  const localStorageData = JSON.parse(localStorage.getItem("data"));

  const notify = (message) => toast.success(message);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const workspace = localStorageData.workspaces.find(
      (w) => w.id === location.state.workspaceId
    );

    console.log(location.state.workspaceId);

    const existingChannel = workspace.channels.find(
      (c) => c.name.toLowerCase() === channelName.toLowerCase()
    );

    if (existingChannel) {
      setError("El canal ya existe");
      return;
    }

    const newChannel = {
      name: channelName,
      id: workspace.channels.length + 1,
      isGeneral: false,
      messages: [],
    };

    localStorageData.workspaces
      .find((w) => w.id === workspace.id)
      .channels.push(newChannel);

    localStorage.setItem("data", JSON.stringify(localStorageData));

    notify(`Nuevo canal '${channelName}' creado!`);
    navigate(previousPath);
  };

  const handleChannelNameChange = (e) => {
    setChannelName(e.target.value);
  };

  const previousPath = location.state?.previousPath || "/";

  return (
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
        {error ? <span className="new-channel-form-error">{error}</span> : ""}
        <button type="submit" disabled={!channelName}>
          Confirmar
        </button>
        <Link to={previousPath}>
          <button className="btn-new-channel">Cancelar</button>
        </Link>
      </form>
    </div>
  );
};

export default NewChannel;
