const { Message } = require("../config/utils");

const User = require("./schemas/user.schemas");

class UserModel {
    createNewUser(data) {
        const user = new User(data);
        return user.save()
            .then(resp => {
                return Message(false, 200, "Se guardo el usuario correctamente");
            }).catch(err => {
                return Message(true, 500, "Error al intentar generar esta acción");
            });
    }

    listAllUsers() {
        return User.find({})
            .then(resp => {
                if (resp.length > 0) return Message(false, 200, "Se obtuvieron todas los usuarios", resp);
                return Message(true, 501, "No se encontro nada.");
            }).catch(err => {
                return Message(true, 500, "Error al intentar generar esta acción");
            });
    }

    findOneUser({ email, password }) {
        return User.findOne({ email, password })
            .then(user => {
                if (user) return Message(false, 200, "Usuario encontrado", user);
                return Message(true, 501, "No se encontro nada.");
            }).catch(err => {
                return Message(true, 500, "Error al intentar generar esta acción");
            });
    }

    static findOneById(_id) {
        return User.findById(_id, 'role status') // Solo vamos a pedir el role y el status
            .then(user => {
                if (user) return Message(false, 200, "Usuario encontrado", user);
                return Message(true, 501, "No se encontro nada.");
            }).catch(err => {
                return Message(true, 500, "Error al intentar generar esta acción");
            })
    }
}

module.exports = UserModel;