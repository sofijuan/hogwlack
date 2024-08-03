import React from "react";
import "./Workspace.css";
import { Link } from "react-router-dom";

const Workspace = ({ id, imgWorkspace, name, channels }) => {
  const [general_channel] = channels.filter((c) => {
    return c.isGeneral;
  });
  return (
    <div className="workspace">
      <div className="workspace-img-and-name">
        <img src={imgWorkspace} alt={name} className="workspace-image" />
        <span className="workspace-name">{name}</span>
      </div>
      <Link to={`/workspace/${id}/${general_channel.id}`}>
        <button className="button-get-in">ENTRAR</button>
      </Link>
    </div>
  );
};

export default Workspace;
