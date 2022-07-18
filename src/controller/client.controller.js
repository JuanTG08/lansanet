const ClientModel = require("../model/client.model")

module.exports = class ClientController {
    static async createNewClient(req, res) {
        
    }

    static async listAllClients(req, res) { // Lista completa de clientes
        return res.json(await ClientModel.listAllClients());
    }
}