const mongoose = require("mongoose")
const validator = require("validator")

const ContatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required:false, dafault: " "},
    telefone: {type: String, required:false, dafault: " "},
    criadoEm: {type: Date, required:true, dafault: new Date()}
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

class Contato{
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

    async register(){
        this.valida()
        if(this.errors.length > 0 ) {return}
        this.contato = await ContatoModel.create(this.body)
    }


    valida(){
        this.cleanUp()

        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push("E-mail invalido")
        if(!this.body.nome) this.errors.push("Nome é um campo obrigatório.")
        if(!this.body.email && !this.body.telefone){this.errors.push("Pelo menos um meio de contato deve ser registrado.")}
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== "string"){
                this.body[key] = "";
            }
        }

        this.body = {
            nome: this.body.nome,
            email: this.body.email,
            telefone: this.body.telefone,
            criadoEm: new Date()
        }
    }

    static async buscaPorId(id) {
        try{        const user= await ContatoModel.findById(id)
            return user
        }catch(e){console.log("Erro ao achar user");return }
        
    }

    async edit(id){
        console.log("edit", id)
        this.valida();
        if(this.errors.length > 0) return
        let contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
        
        this.contato = contato
    }

    static async buscaContatos() {
        try{
            const contatos = await ContatoModel.find().sort({criadoEm: -1});
            return contatos
        }
        catch(e){console.log(e); return}
    }

    static async delete(id){
        let contato = await ContatoModel.findOneAndDelete({_id: id})
        return contato
    }
}

module.exports = Contato;