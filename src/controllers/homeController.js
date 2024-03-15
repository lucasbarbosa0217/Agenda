const Contato = require("../models/contatoModel")

exports.index = async (req, res, next) => {
        const contatos = await Contato.buscaContatos()
        res.render("index", {contatos});
}