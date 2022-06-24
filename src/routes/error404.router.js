// Creamos la instancia de la ruta por defecto en express
const { Router } = require('express');

const router = Router();

// Importamos funciones de nuestro controlador
const { error404 } = require('../controller/errors.controller');

router.route('/')
    .all(error404)

module.exports = router;