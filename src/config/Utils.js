const Utils = {};

Utils.Message = (error, statusCode, message, others = false) => {
    return {
        error,
        statusCode,
        message,
        others,
    }
}

module.exports = Utils;