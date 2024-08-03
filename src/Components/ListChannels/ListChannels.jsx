import React from "react";
import Channel from "../Channel/Channel";

const ListChannels = ({ channels }) => {
  return (
    <>
      {channels.map((channel) => (
        <Channel key={channel.id} id={channel.id} name={channel.name} />
      ))}
    </>
  );
};

export default ListChannels;
