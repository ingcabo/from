import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

function Header({ logout }) {
  return (
    <div className="header">
      <img src={logo} alt="easy logo" className="header__logo" />
      <div className="header__menu">
        <NavLink to="/explore/items" className="header__menu-btn" exact>
          Explorar Medios
        </NavLink>
        <NavLink to="/create-sets" className="header__menu-btn" exact>
          Crear Mediaset
        </NavLink>
        <NavLink to="/explore/sets" className="header__menu-btn" exact>
          Explorar Mediasets
        </NavLink>
        <NavLink to="/upload" className="header__menu-btn" exact>
          Cargar
        </NavLink>
        <NavLink to="/logs" className="header__menu-btn" exact>
          Logs
        </NavLink>
      </div>
      <button onClick={logout} className="btn btn-outline-primary color-white">
        Log out
      </button>
    </div>
  );
}

export default Header;

Header.propTypes = {
  logout: PropTypes.func
};
