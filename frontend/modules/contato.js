import validator from "validator";

export default class ContatoCriar{
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }

    init(){
        this.events();
    }

    events(e){
        if(!this.form){
            
        }
        this.form.addEventListener("submit", e => {
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e) {
        const errors = [];
        const el = e.target;
        const emailInput = el.querySelector(`input[name="email"]`);
        const nomeInput = el.querySelector(`input[name="nome"]`);
        const telefoneInput = el.querySelector(`input[name="telefone"]`);

        if (!emailInput || !telefoneInput || !nomeInput) {
            console.error("Inputs não encontrados");
            return;
        }

        const email = emailInput.value.trim();
        const nome = nomeInput.value.trim();
        const telefone = telefoneInput.value.trim();


        if(email && !validator.isEmail(email)) errors.push("E-mail invalido")
        if(!nome) errors.push("Nome é um campo obrigatório.")
        if(!email && !telefone){errors.push("Pelo menos um meio de contato deve ser registrado.")}
       

        if(errors.length > 0){
            const frontendValidationAlert = document.getElementById("frontendvalidation");
            frontendValidationAlert.classList.remove("d-{none}", "m-0", "p-0");

            frontendValidationAlert.classList.add("alert-danger");

            const errorMessages = errors.join("<br>");
            frontendValidationAlert.innerHTML = errorMessages;
        }else{
            el.submit()
        }

       
    }
}