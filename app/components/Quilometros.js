import PessoasDao from "../db/PessoasDao";
import React, { Component, Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import QuilometragemDao from "./../db/QuilometragemDao";
type Props = {};

const pessoasDao = new PessoasDao();
const quilometragemDao = new QuilometragemDao();

export default class Quilometros extends Component<Props> {
  props: Props;
  constructor(props) {
    super(props);
    this.state = { usuarios: [], quilometros: [] };

    this.handleExcluir = this.handleExcluir.bind(this);
    this.getUsuarios();
  }
  getUsuarios() {
    pessoasDao.buscarTodos(usuarios => {
      const users = usuarios.map(async user => {
        const quilometros = await quilometragemDao.buscar(user._id);
        user.km = quilometros.reduce(
          (acc, item) => acc + parseFloat(item.km),
          0
        );
        return user;
      });

      Promise.all(users)
        .then(usuariosPromise =>
          this.setState({
            usuarios: usuariosPromise
          })
        )
        .catch(console.error);
    });
  }
  handleExcluir(user) {
    return () => pessoasDao.remover(user, () => this.getUsuarios());
  }

  render() {
    const { usuarios } = this.state;

    return (
      <div>
        <div className="toolbar-actions">
          <NavLink to="/add-quilometros" className="btn btn-default pull-right">
            <span className="icon icon-user" />
            Add Quilometros
          </NavLink>
        </div>
        <table className="table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>KM</th>
              <th>ID</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <Fragment>
                <tr key={usuario._id}>
                  <td>{usuario.nome}</td>
                  <td>{usuario.km} km</td>
                  <td>{usuario._id}</td>
                  <td>
                    <Link
                      className="btn btn-warning"
                      to={{
                        pathname: "/editar-quilometros",
                        state: { usuario }
                      }}
                    >
                      <i className="fa fa-pencil" />
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-negative"
                      onClick={this.handleExcluir(usuario)}
                    >
                      <i className="fa fa-trash" />
                    </button>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
