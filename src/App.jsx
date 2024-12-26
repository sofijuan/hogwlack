import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import './App.css';
import WorkspaceDetail from './Pages/WorkspaceDetail/WorkspaceDetail';
import NewWorkspace from './Pages/NewWorkspace/NewWorkspace';
import NewChannel from './Pages/NewChannel/NewChannel';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import VerifyAccount from './Pages/VerifyAccount/VerifyAccount';
import SearchWorkspace from './Pages/SearchWorkspace/SearchWorkspace';
import SearchChannel from './Pages/SearchChannel/SearchChannel';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import EditWorkspace from './Pages/EditWorkspace/EditWorkspace';
import EditChannel from './Pages/EditChannel/EditChannel';
import ContextProvider from './context/ContextProvider';

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/verify/:token" element={<VerifyAccount />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/search-workspace" element={<SearchWorkspace />}></Route>
        <Route
          path="/workspace/:id_workspace/edit"
          element={<EditWorkspace />}
        ></Route>
        <Route
          path="/workspace/:id_workspace/channel/:id_channel/edit"
          element={<EditChannel />}
        ></Route>
        <Route
          path="/workspace/:id_workspace/:id_channel"
          element={<WorkspaceDetail />}
        ></Route>
        <Route path="/new-workspace" element={<NewWorkspace />}></Route>
        <Route
          path="/workspace/:id_workspace/new-channel"
          element={<NewChannel />}
        ></Route>
        <Route
          path="/workspace/:id_workspace/search-channel"
          element={<SearchChannel />}
        ></Route>
      </Routes>
    </ContextProvider>
  );
}

export default App;
