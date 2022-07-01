const { Message, isVerRol } = require("../config/utils");
const AntenaModel = require("../model/antena.model");

const antenasCtrl = {};

// Creamos las Antenas
antenasCtrl.createNewAntena = async (req, res) => {
    if (!isVerRol(req, ["AdminG", "AdminE"])) return res.redirect('/error/notAuthorization');
    const data = req.body;

    const Antena = new AntenaModel();
    const saveAntena = await Antena.createNewAntena(data);

    res.json(saveAntena);
};

// Enlistamos todas las antenas
antenasCtrl.listAllAntenas = async (req, res) => {
    if (!isVerRol(req, ["AdminG", "AdminE"])) return res.redirect('/error/notAuthorization');
    const Antena = new AntenaModel();
    const getListAntenas = await Antena.listAllAntenas();
    res.json(Message(false, 200, "Lista de Antenas", getListAntenas.others));
}

// Buscamos antenas mediante un pequeño filtro
antenasCtrl.findAnyAntena = async (req, res) => {
    if (!isVerRol(req, ["AdminG", "AdminE"])) return res.redirect('/error/notAuthorization');
    const { key, value } = req.body;
    const parameters = {
        [key]: value
    }

    const Antena = new AntenaModel();
    const getFindAntena = await Antena.findAnyAntena(parameters);

    res.json(getFindAntena);
}

// Actualizamos las antenas
antenasCtrl.updateAntena = async (req, res) => {
    if (!isVerRol(req, ["AdminG", "AdminE"])) return res.redirect('/error/notAuthorization');
    const { _id, mac_device } = req.params;
    const { data } = req.body;
    let response = Message(true, 0, "Campos Vacios.");

    const dataConditional = {
        _id,
        mac_device,
    }

    if (data) {
        const Antena = new AntenaModel();
        const updateAntena = await Antena.updateAntena(dataConditional, data);
        response = updateAntena;
    }

    res.json(response);
}

// Cambiamos el estado de las antenas
antenasCtrl.changeStatusAntena = async (req, res) => {
    if (!isVerRol(req, ["AdminG", "AdminE"])) return res.redirect('/error/notAuthorization');
    const { _id, mac_device } = req.params;
    const { status } = req.body;
    let response = Message(true, 0, "Campos Vacios.");

    const dataConditional = {
        _id,
        mac_device,
    }

    if (!dataConditional || status == undefined) {
        res.json(response);
        return ;
    }

    const Antena = new AntenaModel();
    const updateAntena = await Antena.changeStatusAntena(dataConditional, status);

    res.json(updateAntena);
}

module.exports = antenasCtrl;