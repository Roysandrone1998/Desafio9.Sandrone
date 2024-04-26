const FundaModel = require("../models/funda.model");

class FundaService {
    async crearFunda(datosFunda) {
        try {
            const funda = new FundaModel(datosFunda) ;
            return await funda.save();
        } catch (error) {
            throw new Error("Error al crear el juguete");
        }
    }

    async obtenerFundas() {
        try {
            return await FundaModel.find();
        } catch (error) {
            throw new Error("Error al obtener el listado de fundas");
        }
    }
}

module.exports = FundaService;