const Datastore = require("nedb");

function PessoasDao() {
  this.db = new Datastore({
    filename: "./app/db/banco.db",
    autoload: true
  });

  this.inserir = (pessoa, callback) => {
    this.db.insert(pessoa, (err, pessoaCadastrada) => {
      callback(pessoaCadastrada);
    });
  };

  this.atualizar = (pessoa, callback) => {
    this.db.update({ _id: pessoa._id }, pessoa, {}, (err, pessoaAtualizada) => {
      callback(pessoaAtualizada);
    });
  };

  this.buscar = (_id, callback) => {
    this.db.find({ _id }, (err, pessoas) => {
      callback(pessoas[0]);
    });
  };

  this.buscarTodos = callback => {
    this.db
      .find({})
      .sort({ nome: 1 })
      .exec((err, pessoas) => {
        callback(pessoas);
      });
  };

  this.remover = (pessoa, callback) => {
    this.db.remove({ _id: pessoa._id }, {}, (err, quantidade) => {
      callback(quantidade > 0);
    });
  };
}

module.exports = PessoasDao;
