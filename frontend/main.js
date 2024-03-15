import "core-js/stable"
import "regenerator-runtime/runtime"
import Login from "./modules/login"
import ContatoCriar from "./modules/contato";




if (window.location.pathname.includes("/login/index")) {
    const login = new Login(".form-login");
    const cadastro = new Login(".form-registro");
    login.init()
    cadastro.init();

} else if(window.location.pathname.includes("/contato/index")) {
    const contatoCriar = new ContatoCriar(".contatoForm")
    contatoCriar.init();
}