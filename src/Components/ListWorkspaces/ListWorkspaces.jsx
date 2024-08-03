import React from "react";
import Workspace from "../Workspace/Workspace";
import "./ListWorkspaces.css";

const ListWorkspaces = () => {
  const workspaces = JSON.parse(localStorage.getItem("data")).workspaces;

  return (
    <div className="list-workspaces">
      <h2 className="list-workspaces-title">Entornos de Trabajo</h2>
      {workspaces.map((workspace) => (
        <Workspace
          className="workspace"
          key={workspace.id}
          imgWorkspace={workspace.imgWorkspace}
          name={workspace.name}
          channels={workspace.channels}
          id={workspace.id}
        />
      ))}
    </div>
  );
};

export default ListWorkspaces;
