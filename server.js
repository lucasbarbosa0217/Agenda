const express = require("express");
const app = express();
const mongoose = require("mongoose")
require("dotenv").config();
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
      app.emit('mongodb');
    }).catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const csrf = require("csurf")
const helmet = require("helmet")
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      scriptSrc: ["'self'", 'cdn.jsdelivr.net', "code.jquery.com"],
    },
  },
}));


const { MiddlewareGlobal, checkCsrfError, csrfMiddleware } = require("./src/middlewares/middeware");
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')));
const sessionOptions = session({
    secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    }
  });

app.use(sessionOptions);
app.use(flash());
app.set("views", path.resolve(__dirname, "src", "views"))
app.set("view engine", "ejs")

app.use(csrf());

app.use(MiddlewareGlobal)
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes)

app.on("mongodb", () => {
    app.listen(3000, () => {
        console.log("Acessar  http://localhost:3000")
        console.log("Servidor excutando na porta 3000")
    })
    
})

