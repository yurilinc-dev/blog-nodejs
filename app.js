const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { categorias } = require("./models/Categoria");

require('dotenv').config();

const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_DB,
    { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connected.')
    }).catch((err) => {
        console.log('Error connect MongoDB.')
    })

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.render('formulario',)
});

app.listen(PORT, () => {
    console.log(`Escutando na porta: http://localhost:${PORT}.`)
});