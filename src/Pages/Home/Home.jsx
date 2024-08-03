import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ListWorkspaces from "../../Components/ListWorkspaces/ListWorkspaces";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1 className="welcome">Bienvenido a Hogwlack</h1>
      <div className="workspaces">
        <ListWorkspaces className="list-workspaces" />
        <Link to="new-workspace">
          <button className="btn-new-workspace">Crear Entorno</button>
        </Link>
        <ToastContainer
          position="bottom-right"
          pauseOnHover
          draggable
          theme="dark"
        />
      </div>
    </div>
  );
};

export default Home;
