const Sequelize = require("sequelize"); // Importar  o Sequelize
const connection = require("./database"); // Importar a conexão com o banco de dados

//Definir o Model
const Resposta = connection.define('respostas',{ //'respostas' é o nome da tabela
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force:false}); //Sincroniza os dados acima com o banco de dados

module.exports = Resposta;