const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { usuarios } = require("../models/Usuario");

router.get('/usuarios', (req, res) => {
    usuarios.find().lean().then((usuarios) => {
        res.render('admin/usuarios', { usuarios: usuarios })
    })
})

router.get('/usuario/add', (req, res) => {
    res.render('admin/addusuario')
})

router.post('/usuario/novo', (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.senha, salt)

    const novoUsuario = new usuarios({
      nome: req.body.nome,
      email: req.body.email,
      senha: hash
    })
    novoUsuario.save()
    res.redirect('/admin/usuarios')
})

router.get('/usuario/edit/:id', (req, res) => {
    usuarios.findOne({ _id: req.params.id }).lean().then((usuarios)=> {
        res.render('admin/editusuario', {usuarios: usuarios})
    })
})

router.post('/usuario/edit', (req, res) => {
    let filter = { _id: req.body.id }
    let update = { nome: req.body.nome, email: req.body.email, senha: req.body.senha }
    usuarios.findOneAndUpdate(filter, update).then(() => {
        res.redirect('/admin/usuarios')
    }).catch(err => {
        console.log("Erro ao atualizar usuários.")
    })
})

router.post('/usuario/apagar', (req, res) => {
    usuarios.deleteOne({
        _id: req.body.id,
    }).then(() => {
        res.redirect('/admin/usuarios')
    })
})

module.exports = router;