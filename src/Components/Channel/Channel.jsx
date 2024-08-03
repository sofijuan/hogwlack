import React from "react";
import { Link, useParams } from "react-router-dom";

const Channel = ({ id, name }) => {
  const { id_workspace } = useParams();
  return (
    <div>
      <span>
        <Link to={`/workspace/${id_workspace}/${id}`}>{name}</Link>
      </span>
    </div>
  );
};

export default Channel;
