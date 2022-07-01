const { Message } = require("../config/utils");

const errorsCtrl = {};

errorsCtrl.error404 = (req, res) => {
    res.json(Message(true, 404, "Not Found"));
};

errorsCtrl.error401 = (req, res) => {
    res.json(Message(true, 401, "Not authorization"));
}

module.exports = errorsCtrl;