import React, { useState } from 'react';
import Context from './Context.js';

const ContextProvider = ({ children }) => {
  const [channel, setChannel] = useState(null);
  const [workspace, setWorkspace] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);

  const value = {
    channel,
    setChannel,
    workspace,
    setWorkspace,
    loggedUser,
    setLoggedUser
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
