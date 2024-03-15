const Login = require("../models/LoginModel");

exports.index = (req, res) => {
    if (!req.session.user) {
        return res.render("login");
    }
    req.flash("success", ["Você já está logado."]);
    req.session.save(function() {
        return res.redirect("/");
    });
};

exports.register = async function(req, res) {
    const login = new Login(req.body);
    try {
        await login.register();
        if (login.errors.length > 0) {
            req.flash("errors", login.errors);
            req.session.save(function() {
                return res.redirect("index");
            });
            return;
        }
        req.flash("success", ["Usuário criado com sucesso"]);
        req.session.save(function() {
            return res.redirect("index");
        });
    } catch(e) {
        res.render("404");
        return console.log(e);
    }
};

exports.login = async function(req, res) {
    const login = new Login(req.body);
    try {
        await login.login();
        if (login.errors.length > 0) {
            req.flash("errors", login.errors);
            req.session.save(function() {
                return res.redirect("index");
            });
            return;
        }
        req.flash("success", ["Você logou com sucesso."]);
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect("/");
        });
    } catch(e) {
        res.render("404");
        return console.log(e);
    }
};

exports.logout = async function(req, res) {
    req.session.destroy();
    res.redirect("/");
};
