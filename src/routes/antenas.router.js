// Creamos la instancia de la ruta por defecto en express
const { Router } = require('express');

const router = Router();

// Importamos funciones de nuestro controlador
const { createNewAntena, listAllAntenas, findAnyAntena } = require('../controller/antenas.controller');

router.route('/antenaHanddlers')
    .get(listAllAntenas)
    .post(createNewAntena)

router.route('/findAnyAntena')
    .post(findAnyAntena)

module.exports = router;