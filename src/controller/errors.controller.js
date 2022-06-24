const { Message } = require("../config/utils");

const errorsCtrl = {};

errorsCtrl.error404 = (req, res) => {
    res.json(Message(true, 404, "Not Found"));
};

module.exports = errorsCtrl;