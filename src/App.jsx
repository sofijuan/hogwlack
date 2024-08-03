import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import "./App.css";
import WorkspaceDetail from "./Pages/WorkspaceDetail/WorkspaceDetail";
import NewWorkspace from "./Pages/NewWorkspace/NewWorkspace";
import NewChannel from "./Pages/NewChannel/NewChannel";
import rawData from "./MOCK.json";

function App() {
  if (localStorage.getItem("data") === null) {
    localStorage.setItem("data", JSON.stringify(rawData));
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/workspace/:id_workspace/:id_channel"
          element={<WorkspaceDetail />}
        ></Route>
        <Route path="/new-workspace" element={<NewWorkspace />}></Route>
        <Route path="/new-channel" element={<NewChannel />}></Route>
      </Routes>
    </>
  );
}

export default App;
