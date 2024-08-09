import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Channel.css";
const Channel = ({ id, name }) => {
  const { id_workspace } = useParams();
  return (
    <div className="channel">
      <Link className="channel-link" to={`/workspace/${id_workspace}/${id}`}>
        {`# ${name}`}
      </Link>
    </div>
  );
};

export default Channel;
