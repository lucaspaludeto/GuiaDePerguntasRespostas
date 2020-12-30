const express = require("express"); //importei o express
const app = express(); //criei uma cópia dentro da variável, criei uma instância
const bodyParser = require("body-parser"); //Responsável por traduzir os formulários enviados em uma estrutura JS
const connection = require("./database/database"); //Exporta o objeto de conexão
const Pergunta = require("./database/Pergunta"); //Importei o model Pergunta
const Resposta = require("./database/Resposta") // Importei o model Resposta

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })


app.set('view engine', 'ejs'); //Estou dizendo para EXPRESS usar o EJS como view engine
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false})); //Decodifica os dados enviados pelo formulário
app.use(bodyParser.json()); //Permite ler dados de formulário enviados via Json

//Rotas
app.get("/",(req,res) => {
    Pergunta.findAll({ raw: true, order:[//Responsável por procurar e retornar as perguntas da tabela SELECT * FROM .Abri um Json {raw: true} fará uma pesquisa crua pelos dados, trará somente os dados   
        ['id', 'DESC'] // Order responsável por colocar as perguntas em ordem Crescente ASC ou Decrescente DESC
    ]}).then(perguntas => { 
        res.render("index",{
            perguntas: perguntas //Abri um json e criei uma var perguntas que recebe as perguntas do banco de dados. Vou utilizar essa var na View Index
        });
    }); 
});

app.get("/perguntar",(req,res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({ //Chamei o Model Pergunta, o método CREATE é responsável por salvar a pergunta
        titulo: titulo, //O campo título recebe a var titulo
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;
    Pergunta.findOne({ //findOne é um método do Sequelize e busca no banco de dados 1 dado. Abri um Json
        where: {id: id} //nome do campo que eu quero procurar e o valor  que eu quero comparar.
    }).then(pergunta => {
        if(pergunta != undefined){ //Pergunta encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[
                    ['id','DESC']
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                }); 
            });
        }else{ //Pergunta não encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder",(req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=> {
        res.redirect("/pergunta/"+perguntaId);
    });
});
      
app. listen(8080,()=>{console.log("App rodando!");});
