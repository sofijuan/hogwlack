import React, { useEffect, useState } from 'react';
import Workspace from '../Workspace/Workspace';
import './ListWorkspaces.css';
import useFetch from '../../hooks/useFetch';

const ListWorkspaces = () => {
  const { data: workspaces } = useFetch('/workspaces', 'GET', null, true, true);

  let [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUserId(data._id);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="list-workspaces">
      <h2 className="list-workspaces-title">Entornos de Trabajo</h2>
      {workspaces.map((workspace) => (
        <Workspace
          className="workspace"
          key={workspace._id}
          imgWorkspace={workspace.image}
          name={workspace.name}
          channels={workspace.channels}
          id={workspace._id}
          owner={userId === workspace.owner._id}
        />
      ))}
    </div>
  );
};

export default ListWorkspaces;
