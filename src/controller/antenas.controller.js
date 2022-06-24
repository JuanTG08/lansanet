const { Message } = require("../config/utils");
const AntenaModel = require("../model/antena.model");

const antenasCtrl = {};

antenasCtrl.createNewAntena = async (req, res) => {
    const data = req.body;

    const Antena = new AntenaModel();
    const saveAntena = await Antena.createNewAntena(data);

    res.json(saveAntena);
};

antenasCtrl.listAllAntenas = async (req, res) => {
    const Antena = new AntenaModel();
    const getListAntenas = await Antena.listAllAntenas();

    res.json(Message(false, 200, "Lista de Antenas", getListAntenas.others));
}

antenasCtrl.findAnyAntena = async (req, res) => {
    const { key, value } = req.body;
    const parameters = {
        [key]: value
    }

    const Antena = new AntenaModel();
    const getFindAntena = await Antena.findAnyAntena(parameters);

    res.json(getFindAntena);
}

module.exports = antenasCtrl;