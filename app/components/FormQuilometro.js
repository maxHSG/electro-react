import React, { Fragment } from "react";
import QuilometragemDao from "../db/QuilometragemDao";
import PessoasDao from "../db/PessoasDao";

import { Link } from "react-router-dom";

const pessoasDao = new PessoasDao();
const quilometragemDao = new QuilometragemDao();

export default class FormQuilometro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      usuarios: [],
      user_id: "",
      km: ""
    };
    console.log("Teste", props);
    // if (typeof props.location.state !== "undefined") {
    //   const user = props.location.state.usuario;
    //   this.state = {
    //     aviso: "",
    //     _id: user._id,
    //     idade: user.idade,
    //     nome: user.nome,
    //     km: user.km
    //   };
    // }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUsuarios();
  }
  getUsuarios() {
    pessoasDao.buscarTodos(usuarios => this.setState({ usuarios }));
  }
  handleChange(field) {
    return evt => {
      const data = {};
      data[field] = evt.target.value;
      console.log("Data", data);
      this.setState(data);
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const method = this.id ? "atualizar" : "inserir";

    quilometragemDao[method](
      {
        user_id: this.state.user_id,
        km: this.state.km
      },
      user => {
        this.setState({
          aviso:
            method === "atualizar"
              ? `Quilometragem atualizado com sucesso`
              : `Quilometragem cadastrado com sucesso`,
          user_id: "",
          km: ""
        });
      }
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="padded-more">
        {this.state.aviso !== "" ? (
          <div className="alert">
            <p>{this.state.aviso}</p>
          </div>
        ) : (
          ""
        )}
        <div className="form-group">
          <label>User</label>
          <select
            value={this.state.user_id}
            className="form-control"
            onChange={this.handleChange("user_id")}
          >
            {this.state.usuarios.map(user => (
              <Fragment>
                <option value={user._id}>{user.nome}</option>
              </Fragment>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Quilômetros</label>
          <input
            value={this.state.km}
            onChange={this.handleChange("km")}
            type="number"
            className="form-control"
            placeholder="Quilômetros"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Salvar</button>
          <Link to="/usuarios" className="btn btn-default">
            Votar
          </Link>
        </div>
      </form>
    );
  }
}
