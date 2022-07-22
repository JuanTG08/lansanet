const ClientModel = require("../model/client.model");
const { Message } = require("../config/Utils");
module.exports = class ClientController {
  static async listAllClients(req, res) {
    // Lista completa de clientes
    return res.json(await ClientModel.listAllClients());
  }

  static async findClientById(req, res) {
    const { idClient } = req.params;
    if (!idClient) return res.status(406).json(Message(true, 406, "Campos invalidos"));
    const client = await ClientModel.findClientById(idClient);
    return res.status(200).json(client);
  }

  static async findOneClient(req, res) {
    const { filter } = req.body;
    if (!filter) return res.status(406).json(Message(true, 406, "Campos invalidos"));
    const client = await ClientModel.findOneClient(filter);
    return res.status(200).json(client);
  }

  static async findClients(req, res) {
    const { filter } = req.body;
    if (!filter) return res.status(406).json(Message(true, 406, "Campos invalidos"));
    const clients = await ClientModel.findClients(filter);
    return res.status(200).json(clients);
  }

  static async createNewClient(req, res) {
    const clientData = req.body;
    const data = {
        name: clientData.name,
        last_name: clientData.last_name,
        document_id: clientData.document_id,
        number_phone: clientData.number_phone,
        address: clientData.address,
        neighborhood: clientData.neighborhood,
        email: clientData.email,
        installation_date: clientData.installation_date,
        payday: clientData.payday,
        monthly_value: clientData.monthly_value,
        status: clientData.status,
    };
    // Se comprueba de que la informacion sea coherente
    if (!data) return res.status(406).json(Message(true, 406, "Campos invalidos"));
    const clientSave = await ClientModel.createNewClient(data);
    return res.status(200).json(clientSave);
  }

  static async updateClient(req, res) {
    const { idClient, dataClient } = req.body;
    if (!idClient || !dataClient) return res.status(406).json(Message(true, 406, "Campos invalidos"));
    const updateClient = await ClientModel.updateClient(idClient, dataClient);
    return res.status(200).json(updateClient);
  }

  static async deleteClient(req, res) {
    const { idClient } = req.params;
    if (!idClient) return res.status(406).json(Message(true, 406, "Campos invalidos"));
    const deleteClient = await ClientModel.deleteClient(idClient);
    return res.status(200).json(deleteClient);
  }
};
