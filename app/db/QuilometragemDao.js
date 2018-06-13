const Datastore = require("nedb");

function quilometrosDao() {
  this.db = new Datastore({
    filename: "./app/db/quilometros.db",
    autoload: true
  });

  this.inserir = (quilometro, callback) => {
    this.db.insert(quilometro, (err, quilometroCadastrada) => {
      callback(quilometroCadastrada);
    });
  };

  this.atualizar = (quilometro, callback) => {
    this.db.update(
      { _id: quilometro._id },
      quilometro,
      {},
      (err, quilometroAtualizada) => {
        callback(quilometroAtualizada);
      }
    );
  };

  this.buscar = user_id => {
    return new Promise((resolve, reject) => {
      this.db.find({ user_id }, (err, quilometros) => {
        return err ? reject(err) : resolve(quilometros);
      });
    });
  };

  this.buscarTodos = callback => {
    this.db
      .find({})
      .sort({ nome: 1 })
      .exec((err, quilometros) => {
        callback(quilometros);
      });
  };

  this.remover = (quilometro, callback) => {
    this.db.remove({ _id: quilometro._id }, {}, (err, quantidade) => {
      callback(quantidade > 0);
    });
  };
}

module.exports = quilometrosDao;
