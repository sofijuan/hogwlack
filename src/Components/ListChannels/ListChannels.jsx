import React from "react";
import Channel from "../Channel/Channel";

const ListChannels = ({ channels }) => {
  return (
    <div className="list-channels">
      {channels.map((channel) => (
        <Channel key={channel.id} id={channel.id} name={channel.name} />
      ))}
    </div>
  );
};

export default ListChannels;
