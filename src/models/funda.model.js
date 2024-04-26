const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    nombre:String,
    categoria: String, 
    precio: Number
})

const JugueteModel = mongoose.model("fundas", schema);

module.exports = FundaModel;