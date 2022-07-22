const Client = require("./schemas/client.schemas")
const { Message } = require("../config/Utils");

module.exports = class ClientModel {
    static listAllClients() {
        return Client.find({})
            .then(resp => {
                if (resp.length > 0) return Message(false, 200, "Se obtuvieron todas los clientes", resp);
                return Message(true, 501, "No se encontro nada.");
            }).catch(err => {
                return Message(true, 500, "Error al intentar generar esta acción");
            });
    }

    static findClientById(id) {
        return Client.findById(id)
            .then(resp => {
                console.log(resp.length)
                if (resp._id) return Message(false, 200, "Cliente encontrado", resp);
                return Message(true, 501, "No se encontro nada.");
            }).catch(err => {
                return Message(true, 500, "Error al intentar generar esta acción");
            });
    }

    static findOneClient(filter) {
        return Client.findOne(filter)
            .then(user => {
                if (user) return Message(false, 200, "Cliente encontrado", user);
                return Message(true, 501, "No se encontro nada.");
            }).catch(err => {
                return Message(true, 500, "Error al intentar generar esta acción");
            })
    }

    static findClients(filter) {
        return Client.find(filter)
            .then(user => {
                if (user) return Message(false, 200, "Clientes encontrados", user);
                return Message(true, 501, "No se encontro nada.");
            }).catch(err => {
                return Message(true, 500, "Error al intentar generar esta acción");
            })
    }

    static createNewClient(data) {
        const client = new Client(data);
        return client.save()
            .then(resp => {
                return Message(false, 200, "Se guardo el cliente correctamente");
            }).catch(err => {
                return Message(true, 500, "Error al intentar generar esta acción");
            });
    }

    static updateClient(_id, data) {
        return Client.findByIdAndUpdate(_id, data)
            .then(user => {
                if (user) return Message(false, 200, "Cliente Modificado", );
                return Message(true, 501, "No es posible encontrar este usuario");
            }).catch(err => {
                return Message(true, 500, "Error al intentar generar esta acción");
            })
    }

    static deleteClient(_id) {
        return Client.findByIdAndDelete(_id)
            .then(user => {
                if (user) return Message(false, 200, "Cliente Eliminado", user);
                return Message(true, 501, "No es posible encontrar este usuario");
            }).catch(err => {
                return Message(true, 500, "Error al intentar generar esta acción");
            })
    }
}