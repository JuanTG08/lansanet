// Creamos la instancia de la ruta por defecto en express
const { Router } = require('express');

const router = Router();

// Importamos funciones de nuestro controlador
const {
    createNewAntena,
    listAllAntenas,
    findAnyAntena,
    updateAntena,
    changeStatusAntena
} = require('../controller/antenas.controller');

router.route('/antenaHanddlers')
    .get(listAllAntenas)
    .post(createNewAntena)

router.route('/antenaHanddlers/:_id/:mac_device')
    .put(updateAntena)
    .delete(changeStatusAntena)

router.route('/findAnyAntena')
    .post(findAnyAntena)

module.exports = router;