const express = require('express');
const app = express();
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const handlebars = exphbs.create({});

//Encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Diretório público
app.use(express.static(path.join(__dirname, '/public')));

//Importar models
const { categorias } = require("./models/Categoria");
const { postagens } = require("./models/Postagem");

//Rotas
const categoria = require('./routes/categoria');
const usuario = require('./routes/usuario');
const postagem = require('./routes/postagem');

// Sessao
app.use(session({
    secret:"blog-em-node-js",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

//Rotas
app.use('/admin', categoria);
app.use('/admin', usuario);
app.use('/admin', postagem);

//Template engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//ENV
require('dotenv').config();

//Connect MongoDB
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_DB,
    { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connected.');
    }).catch((err) => {
        console.log('Error connect MongoDB.');
    });

//Porta de acesso
const PORT = process.env.PORT

// Home page
app.get('/', (req, res) => {
    postagens.find().populate("categoria").sort({date:"desc"})
    .lean().then((postagens) =>{
        res.render('home', { postagens: postagens })
    }).catch((err) => {
        res.redirect("/404")
    })
});

app.get('/:id', (req, res) => {
    postagens.findOne({slug:req.params.id}).lean().then((postagens) =>{
        res.render('ler', { postagens: postagens })
    }).catch((err) => {
        res.redirect("/404")
    })
});

app.get("/404", (req,res) => {
    res.send('Erro 404')
});

app.listen(PORT, () => {
    console.log('Escutando na porta: ' + PORT )
});