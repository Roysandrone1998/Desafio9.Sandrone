const mongoose = require("mongoose");

const fundaSchema = new mongoose.Schema({
    nombre:String,
    categoria: String, 
    precio: Number
})

const FundaModel = mongoose.model("fundas", fundaSchema);

module.exports = FundaModel;