// Creamos la instancia de la ruta por defecto en express
const { Router } = require('express');

const router = Router();

// Importamos funciones de nuestro controlador
const { error401 } = require('../controller/errors.controller');

router.route('/notAuthorization')
    .all(error401)

module.exports = router;