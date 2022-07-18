const jwt = require('jsonwebtoken');
const { SECRET_SERVER } = require('../config/config');
const { Message } = require('../config/utils');
const { findOneById } = require('../model/user.model');

module.exports = class TokenAuth {
    static createTokenAuth(payload) { // Creamos el token de autentificación para los usuarios
        return jwt.sign(payload, SECRET_SERVER);
    }

    static verifyToken(bearerToken) { // Realizamos las verificaciones validas al token
        if (!bearerToken) return Message(true, 401, "Unauthorized"); // Debemos realizar el error correspondiente
        const tokenDess = bearerToken.split(" ")[1];
        try {
            const token = jwt.verify(tokenDess, SECRET_SERVER);
            return Message(false, 200, "Ok", token);
        } catch (error) {
            return Message(true, 810, "Invalid Token");
        }
    }


    /*
    *
    * Middlewares
    *
    */

    // Funcionalidad principal para obtener el usuario y a su vez validar el token
    static async isLoggedIn(req, res, next) {
        const { authorization } = req.headers;
        const token = TokenAuth.verifyToken(authorization); // Realizamos la verificacion Superficial
        if (token.statusCode != 200 || !token.others._id) return res.status(500).json(token); // Si da algun error lo imprimimos
        const user = await findOneById(token.others._id); // Buscamos el usuario en cuestion
        if (user.error || user.statusCode != 200) return res.status(500).json(user); // Si no existe el usuario en cuestion
        if (!user.others.status) return res.status(500).json(Message(true, 500, "Disabled User")); // Si el usuario esta deshabilitado
        req.user_role = user.others.role;
        next();
    }

    // Verificacion exacta si es un usuario de tipo 'AdminG'
    static async is_AdminG(req, res, next) {
        if (!req.user_role) return res.status(500).json(Message(true, 500, 'Error'));
        if (req.user_role != 'AdminG') return res.status(401).json(Message(true, 401, 'Unauthorized'));
        next();
    }
    // Verificacion exacta si es un usuario de tipo 'AdminE'
    // Un admin General puede realizar lo que hace un admin empresarial
    static async is_AdminE(req, res, next) {
        if (!req.user_role) return res.status(500).json(Message(true, 500, 'Error')); // Si el rol no existe
        if (req.user_role === 'AdminE' || req.user_role === 'AdminG') return next(); // Si existe el rol y coincide
        return res.status(401).json(Message(true, 401, 'Unauthorized')); // Si el rol existe pero no coincide
    }
}