// Creamos la instancia de la ruta por defecto en express
const { Router } = require('express');

const router = Router();

// Importamos funciones de nuestro controlador
const { home } = require('../controller/home.controller');

router.route('/')
    .get(home)

module.exports = router;