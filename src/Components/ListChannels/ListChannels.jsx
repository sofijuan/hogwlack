import React, { useState, useEffect } from 'react';
import Channel from '../Channel/Channel';

const ListChannels = ({ channels }) => {
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
    <div className="list-channels">
      {channels.map((channel) => (
        <Channel
          key={channel._id}
          id={channel._id}
          name={channel.name}
          owner={userId === channel.owner}
        />
      ))}
    </div>
  );
};

export default ListChannels;
