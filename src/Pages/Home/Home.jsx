import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ListWorkspaces from '../../Components/ListWorkspaces/ListWorkspaces';
import './Home.css';
import Header from '../../Components/Header/Header';

const Home = () => {
  return (
    <div className="home">
      <Header />

      <div className="workspaces">
        <ListWorkspaces className="list-workspaces" />
        <Link to="/new-workspace">
          <button className="btn-home-new-workspace">Crear Entorno</button>
        </Link>
        <Link to="/search-workspace">
          <button className="btn-home-search-workspace">Buscar Entorno</button>
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
