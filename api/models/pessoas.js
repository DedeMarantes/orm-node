'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('Pessoas', {
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado) {
          if(dado.length < 2) throw new Error("Campo nome deve ter mais de 2 caracteres")
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Dados do tipo email invalidos"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    paranoid: true,
    defaultScope: {
      where: { ativo: true }
    },
    scopes: {
      todos: {
        where: {},
        //qualquer outro escopo
      }
    }
  });
  Pessoas.associate = function (models) {
    Pessoas.hasMany(models.Turmas, { foreignKey: 'docente_id' });
    Pessoas.hasMany(models.Matriculas, { 
      foreignKey: 'estudante_id' ,
      scope: {status: 'confirmado'},
      as: 'aulasMatriculadas'
  });
  };
  return Pessoas;
};