import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./NewWorkspace.css";

const NewWorkspace = () => {
  const navigate = useNavigate();

  const [workspaceName, setWorkspaceName] = useState("");
  const [channelName, setChannelName] = useState("");

  const [error, setError] = useState("");

  const localStorageData = JSON.parse(localStorage.getItem("data"));

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const notify = (message) => toast.success(message);

    const existingWorkspace = localStorageData.workspaces.find(
      (w) => w.name === workspaceName
    );

    if (existingWorkspace) {
      setError("El workspace ya existe");
      return;
    }

    const newWorkspace = {
      name: workspaceName,
      creationDate: new Date().toLocaleDateString("es-ES"),
      imgWorkspace:
        "https://www.freepnglogos.com/uploads/hogwarts-logo-png/hogwarts-logo-tumblr-1.png",
      id: localStorageData.workspaces.length + 1,
      channels: [
        {
          name: "General",
          id: 1,
          isGeneral: true,
          messages: [
            {
              id: 1,
              author: "Minerva McGonagall",
              imgAuthor:
                "https://depor.com/resizer/OfvrRESZOi4qWgzOYsGBf1PIuHU=/1200x1200/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/N34U2GVEQVD6DDE7GJHAEX65PY.jpg",
              date: new Date(),
              text: "Bienvenido",
            },
          ],
        },
      ],
    };

    const newChannel =
      channelName.toLowerCase() === "general"
        ? null
        : {
            name: channelName,
            id: 2,
            isGeneral: false,
            messages: [
              {
                id: 1,
                author: "Minerva McGonagall",
                imgAuthor:
                  "https://depor.com/resizer/OfvrRESZOi4qWgzOYsGBf1PIuHU=/1200x1200/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/N34U2GVEQVD6DDE7GJHAEX65PY.jpg",
                date: new Date(),
                text: "Bienvenido",
              },
            ],
          };

    if (newChannel) {
      newWorkspace.channels.push(newChannel);
    }

    localStorageData.workspaces.push(newWorkspace);

    localStorage.setItem("data", JSON.stringify(localStorageData));

    notify(`Nuevo workspace '${workspaceName}' creado`);

    navigate("/");
  };

  const handleWorkspaceNameChange = (e) => {
    setWorkspaceName(e.target.value);
  };

  const handleChannelNameChange = (e) => {
    setChannelName(e.target.value);
  };

  return (
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
            ""
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
          <Link to="/">
            <button className="btn-new-workspace">Cancelar</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewWorkspace;
