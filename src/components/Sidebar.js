import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

function Sidebar({ logout }) {
  return (
    <div className="sidebar">
      <div className="Sidebar__header flex-container align-center space-between">
        <img src={logo} alt="easy logo" className="sidebar__logo" />
        <button onClick={logout} className="btn btn-outline-primary">
          Log out
        </button>
      </div>
      <div className="sidebar__menu">
        <NavLink to="/" className="sidebar__menu-btn" exact>
          Crear Mediaset
        </NavLink>
        <NavLink to="/explore/sets" className="sidebar__menu-btn" exact>
          Explorar Mediasets
        </NavLink>
        <NavLink to="/upload" className="sidebar__menu-btn" exact>
          Cargar
        </NavLink>
        <NavLink to="/explore/items" className="sidebar__menu-btn" exact>
          Explorar Medios
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  logout: PropTypes.func
};
