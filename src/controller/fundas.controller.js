const FundaService = require("../services/fundas.services.js");
const fundaService = new FundaService(); 

class fundaController {
    async crearFunda(req, res) {
        try {
            const funda = await fundaService.crearFunda(req.body);
            res.json(funda);
        } catch (error) {
            res.status(500).json({error: "No se puede crear el funda"});
        }
    }

    async obtenerFundas(req, res) {
        try {
            const fundas = await fundaService.obtenerFundas();
            res.json(fundas);
        } catch (error) {
            res.status(500).json({error: "No se pueden obtener las fundas"});
        }
    }
}

module.exports = FundaController;