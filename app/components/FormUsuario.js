import React from "react";
import PessoasDao from "../db/PessoasDao";
import { Link } from "react-router-dom";
export default class FormUsuario extends React.Component {
  constructor(props) {
    super(props);

    this.state = { aviso: "", _id: "", idade: "", nome: "", km: "" };
    console.log("Teste", props.location.state);
    if (typeof props.location.state !== "undefined") {
      const user = props.location.state.usuario;
      this.state = {
        aviso: "",
        _id: user._id,
        idade: user.idade,
        nome: user.nome,
        km: user.km
      };
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    const method = this.state._id ? "atualizar" : "inserir";

    const usuarios = new PessoasDao();
    usuarios[method](
      {
        nome: this.state.nome,
        idade: this.state.idade,
        km: this.state.km
      },
      user => {
        this.setState({
          aviso:
            method === "atualizar"
              ? `${this.state.nome} atualizado com sucesso`
              : `${user.nome} cadastrado com sucesso`,

          nome: "",
          idade: "",
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
          <label>Nome</label>
          <input
            value={this.state.nome}
            onChange={this.handleChange("nome")}
            type="text"
            className="form-control"
            placeholder="Nome"
          />
        </div>
        <div className="form-group">
          <label>Idade</label>
          <input
            value={this.state.idade}
            onChange={this.handleChange("idade")}
            type="number"
            className="form-control"
            placeholder="Idade"
          />
        </div>
        <div className="form-group">
          <label>Quilômetro</label>
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
