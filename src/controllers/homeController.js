const Home = require("../models/HomeModel")


exports.index = (req, res, next) => {

    res.render("index")
    next();
}

console.log(Home)