const crypto = require('crypto');
const { SECRET_SERVER } = require('./config');

const Utils = {};

Utils.Message = (error, statusCode, message, others = false) => {
    return {
        error,
        statusCode,
        message,
        others,
    }
}

/* Realizamos todas las funciones relacionadas a la encriptación */
Utils.encrypt = text => {
    const textEncrypted = crypto.createSign
}

/* Realizamos todo lo relacionado al tiempo */
Utils.getStimationTimeMins = (timeNow, expiration_time_min) => {
    const estimateTimeExpirationMin = expiration_time_min * 1000 * 60; // Calculamos los minutos pasados por el argurmento, lo transformamos a minutos
    return timeNow + estimateTimeExpirationMin; // Le establecemos esos minutos al tiempo actual
}

/* Verificamos el rol correspondiente */
Utils.isVerRol = (req, rolArray) => {
    const role = req.body.sessionID.role || "";
    return rolArray.filter(rol => role === rol).length > 0;
}

module.exports = Utils;