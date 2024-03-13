const mongoose = require("mongoose")

const loginSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descricao: String
});

const LoginModel = mongoose.model("Login", loginSchema);

class Login{
    constructor(body){
        this.body = body;
    }
}

module.exports = Login;