const express = require("express");
const session = require("express-session");

const FileStore = require("session-file-store");

const fileStore = FileStore(session);
const app = express();
const PUERTO = 8080;
const cookieParser = require("cookie-parser");

const MongoStore = require("connect-mongo");
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/sessions.router.js");
require("../src/database.js");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({


    secret: "secretcoder",

    resave: true, 

    saveUninitialized: true,

    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coderhouse50045:Coder1@cluster0.fpmis3v.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
    })

}))

app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);

app.get("/crearcuki", (req, res) => {
    res.cookie("cuki", "esto es una cukiii").send("Cuki creada");
})


app.get("/borrarcuki", (req, res) => {
    res.clearCookie("cuki").send("Cuki borrada!");
})



app.get("/login", (req, res) => {
    let usuario = req.query.usuario; 

    req.session.usuario = usuario; 
    res.send("Guardamos el usuario por medio de query");
})



app.get("/usuario", (req, res) => {
    if(req.session.usuario) {
        return res.send(`El usuario registrado es el siguiente: 
        ${req.session.usuario}`);
    } 

    res.send("No tenemos un usuario registrado, vamos a morir!");

})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})