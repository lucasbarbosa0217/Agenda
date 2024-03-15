const Contato = require("../models/contatoModel")

exports.index = (req, res) => {
        res.render("contatos", {contato: {}});
}

exports.register = async(req, res) =>{
    try{  const contato = new Contato(req.body)
        await contato.register();
    
        if(contato.errors.length > 0){
            req.flash("errors", contato.errors);
            req.session.save(function() {
                return res.redirect("/contato/index");
            });
        }else{
            req.flash("success", ["Contato criado com sucesso!"]);
            req.session.save(function() {
                return res.redirect(`/contato/index/${contato.contato._id}`);
            });
        }
    
        }
    catch(e){console.log(e)}
}




exports.editIndex =  async(req, res) => {
    if(!req.params.id)return res.render("404")
    const contato = await Contato.buscaPorId(req.params.id)

    if(!contato) return res.render("404")

    res.render("contatos", {
        contato: contato
    });
}

exports.update = async(req, res)=> {
    const contato = new Contato(req.body)
    
  try{  

    await contato.edit(req.params.id)

    if(contato.errors.length > 0){
        req.flash("errors", contato.errors);
        req.session.save(function() {
            return res.redirect(`/contato/index/${req.params.id}`);
        });
    }else{
        req.flash("success", ["Contato editado com sucesso!"]);
        req.session.save(function() {
        return res.redirect(`/contato/index/${contato.contato._id}`);
        });
    }

}
  catch(e){console.log(e)}

}

exports.delete =  async(req, res) => {
    if(!req.params.id)return res.render("404")
    const contato = await Contato.delete(req.params.id)
    if(!contato) return res.render("404")
    req.flash("success", [`Contato ${contato.nome} apagado com sucesso!`]);
        req.session.save(function() {
        return res.redirect(`/`);
        });
}
