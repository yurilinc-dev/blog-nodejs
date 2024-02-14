const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { categorias } = require("../models/Categoria");

router.get('/categorias', (req, res) =>{
    categorias.find().lean().then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    })
})

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategoria')
})

router.post('/categoria/nova', (req,res) => {
    const novaCategoria = new categorias({
        
    })
})

module.exports = router;