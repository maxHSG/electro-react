// @flow
import { Route } from "react-router-dom";
import React, { Component } from "react";
import NavBar from "./Navbar";
import Usuarios from "./Usuarios";
import FormUsuario from "./FormUsuario";
import FormQuilometro from "./FormQuilometro";
import Quilometros from "./Quilometros";
// import { Link } from "react-router-dom";
// import styles from "./Home.css";
type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="window">
        <header className="toolbar toolbar-header">
          <h1 className="title">Header</h1>
        </header>
        <div className="window-content">
          <div className="pane-group">
            <div className="pane-sm sidebar">
              <NavBar />
            </div>
            <div className="pane">
              <Route path="/usuarios" component={Usuarios} />
              <Route path="/add-usuario" component={FormUsuario} />
              <Route path="/editar-usuario" component={FormUsuario} />
              <Route path="/add-quilometros" component={FormQuilometro} />
              <Route path="/quilometragem" component={Quilometros} />
              {/* <Route path="/contact" component={Contact} /> */}
            </div>
          </div>
        </div>
        <footer className="toolbar toolbar-footer">
          <h1 className="title">Footer</h1>
        </footer>
      </div>
    );
  }
}
