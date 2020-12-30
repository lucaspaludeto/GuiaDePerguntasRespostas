const Sequelize = require("sequelize"); // Importar  o Sequelize
const connection = require("./database"); // Importar a conexão com o banco de dados

//Definir o Model
const Pergunta = connection.define('perguntas',{ //'pergunta' é o nome da tabela
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force:false}).then(() => {}); //Sincroniza os dados acima com o banco de dados

module.exports = Pergunta;