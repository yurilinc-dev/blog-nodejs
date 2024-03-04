const express = require('express');
const app = express();
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
const handlebars = exphbs.create({});


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, '/public')));

const { categorias } = require("./models/Categoria");

const categoria = require('./routes/categoria');

app.use('/admin', categoria);


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

require('dotenv').config();

app.get('/', (req, res) => {
    res.render('layouts/main');
});

const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_DB,
    { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connected.');
    }).catch((err) => {
        console.log('Error connect MongoDB.');
    });

const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.render('formulario',);
});

app.listen(PORT, () => {
    console.log(`Escutando na porta: http://localhost:${PORT}.`)
});