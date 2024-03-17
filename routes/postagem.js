const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Arquivos models
const { categorias } = require('../models/Categoria')
const { postagens } = require('../models/Postagem')

router.get('/postagens', (req, res) => {
    postagens.find().populate("cateogira").sort({ date: "desc" }).lean().then((postagens) => {
        res.render('admin/postagens', { postagens: postagens })
    })
})


module.exports = router;