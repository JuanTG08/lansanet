// Creamos la instancia de la ruta por defecto en express
const { Router } = require('express');

const router = Router();

// Importamos funciones de nuestro controlador
const { createNewUser, listAllUsers, loginUser } = require('../controller/user.controller');

router.route('/createNewUser')
    .post(createNewUser)

router.route('/listAllUsers')
    .get(listAllUsers);

router.route('/loginUser')
    .post(loginUser)

module.exports = router;