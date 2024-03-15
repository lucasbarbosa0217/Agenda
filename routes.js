const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const {loginRequired} = require("./src/middlewares/middeware") 
const contatoController = require("./src/controllers/contatoController");

route.get("/", loginRequired, homeController.index);
route.get("/login/index", loginController.index);
route.post("/login/register", loginController.register);
route.post("/login/login", loginController.login);
route.get("/login/logout", loginController.logout);

route.get("/contato/index",loginRequired, contatoController.index); 
route.post("/contato/register", loginRequired, contatoController.register)
route.post("/contato/update/:id", loginRequired, contatoController.update)

route.get("/contato/index/:id", loginRequired, contatoController.editIndex)
route.get("/contato/delete/:id", loginRequired, contatoController.delete)

route.use((req, res, next) => {
    res.status(404).render("404");
});

module.exports = route;
