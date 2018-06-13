import React, { Component } from "react";
import { NavLink } from "react-router-dom";

type Props = {};

export default class NavBar extends Component<Props> {
  props: Props;

  render() {
    return (
      <nav className="nav-group">
        <h5 className="nav-group-title">Menu</h5>
        <NavLink className="nav-group-item active" to="/usuarios">
          <span className="icon icon-user" />
          Usuarios
        </NavLink>
        <NavLink className="nav-group-item" to="/quilometragem">
          <span className="icon icon-up" />
          Quilômetragem
        </NavLink>
      </nav>
    );
  }
}
