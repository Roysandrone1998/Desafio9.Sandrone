const FundaRepository = require("../repositories/funda.repository.js");
const fundaRepository = new FundaRepository(); 

class FundaController {
    async getFundas(req, res) {
        try {
            const fundas = await fundaRepository.traerTodo();
            res.status(200).json(fundas);
        } catch (error) {
            res.status(500).json("Error del servidor");
        }
    }

    async postFundas(req, res) {
        const nuevoFunda = req.body;
        try {
            await fundaRepository.crear(nuevoFunda);
            res.status(200).send("funda creada");
        } catch (error) {
            res.status(500).json("Error del servidor");
        }
    }
}

module.exports = FundaController;