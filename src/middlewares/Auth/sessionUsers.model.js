const { Message } = require("../../config/utils");

const Session = require("./sessionUsers.schemas");

class SessionModel {
    createNewSession(data) {
        const session = new Session(data);
        return session.save()
            .then(resp => {
                return Message(false, 200, "Se guardo la session correctamente");
            }).catch(err => {
                console.log(err);
                return Message(true, 500, "Error al intentar generar esta acción, items duplicados");
            });
    }

    listAllSession() {
        return Session.find({})
            .then(resp => {
                if (resp.length > 0) return Message(false, 200, "Se obtuvieron todas los Sesiones", resp);
                return Message(false, 501, "No se encontro nada.");
            }).catch(err => {
                console.log(err);
                return Message(true, 500, "Error al intentar generar esta acción");
            });
    }

    findOneSession(data) {
        return Session.findOne(data)
            .then(resp => {
                if (resp) return Message(false, 200, "Session encontrado", resp);
                return Message(false, 501, "No se encontro nada.");
            }).catch(err => {
                console.log(err);
                return Message(true, 500, "Error al intentar generar esta acción");
            });
    }

    deleteOneSession(filter) {
        return Session.deleteOne(filter)
            .then(resp => {
                return true;
            }).catch(err => {
                console.log(err);
                return false;
            });
    }
}

module.exports = SessionModel;