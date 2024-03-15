import validator from "validator";

export default class login{
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }

    init(){
        this.events();
        console.log(this.form)
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
        const emailInput = el.querySelector(`input[name="email"]`)
        const passwordInput = el.querySelector(`input[name="password"]`)

        if (!emailInput || !passwordInput) {
            console.error("Inputs não encontrados");
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if(!validator.isEmail(emailInput.value)){errors.push("E-mail invalido.")}
        if(passwordInput.value < 3 || passwordInput > 50){errors.push("A senha deve ter entre 3 e 50 caracteres.")}
        

        if(errors.length > 0){
            const frontendValidationAlert = document.getElementById("frontendvalidation");
            frontendValidationAlert.classList.add("alert-danger");
            frontendValidationAlert.classList.remove("d-none", "m-0", "p-0");
            const errorMessages = errors.join("<br>");
            frontendValidationAlert.innerHTML = errorMessages;
        }else{
            el.submit()
        }

       
    }
}