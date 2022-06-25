const { Message } = require("../config/utils");

const Antena = require("./schemas/antena.schemas");

class AntenaModel {
    // Se crea una nueva antena
    createNewAntena(data) {
        const antena = new Antena(data);
        return antena.save()
            .then(resp => {
                return Message(false, 200, "Se guardo la antena correctamente");
            }).catch(err => {
                console.log(err);
                return Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    listAllAntenas() {
        return Antena.find({ device_status: true })
            .then(resp => {
                if (resp.length > 0) return Message(false, 200, "Se obtuvieron todas las antenas", resp);
                return Message(false, 501, "No se encontro nada.");
            }).catch(err => {
                console.log(err);
                return Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    findAnyAntena(parameters) {
        return Antena.find(parameters)
            .then(resp => {
                if (resp.length > 0) return Message(false, 200, "Se obtuvó la información", resp);
                return Message(false, 501, "No se encontro nada.");
            }).catch(err => {
                console.log(err);
                return Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    updateAntena(condition, data) {
        return Antena.updateMany(condition, data)
            .then(({ modifiedCount, matchedCount }) => {
                let response = Message(true, 0, "No es posible ubicar la Antena dada");
                if (modifiedCount > 0 && matchedCount > 0) response = Message(false, 200, "Se actualizo correctamente");
                else if (modifiedCount == 0 && matchedCount > 0) response = Message(false, 200, "Datos actualizados con anterioridad");
                return response;
            })
            .catch(err => {
                console.error(err);
                return Message(true, 500, "Error al intentar generar esta acción");
            });
    }

    changeStatusAntena(condition, status) {
        return Antena.updateMany(condition, { device_status: status })
            .then(({ modifiedCount, matchedCount }) => {
                let response = Message(true, 0, "No es posible ubicar la Antena dada");
                if (modifiedCount > 0 && matchedCount > 0) response = Message(false, 200, "Ok");
                else if (modifiedCount == 0 && matchedCount > 0) response = Message(false, 200, "Ok.");
                return response;
            })
            .catch(err => {
                console.error(err);
                return Message(true, 500, "Error al intentar generar esta acción");
            });
    }
}

module.exports = AntenaModel;