const Sequelize = require('sequelize'); //Importar o módulo sequelize
const connection = new Sequelize('guiaperguntas','root','root',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
