// Creamos la instancia de la ruta por defecto en express
const { Router } = require('express');

const router = Router();

// Importamos funciones de nuestro controlador
const {
    listAllClients,
    findClientById,
    findOneClient,
    findClients,
    createNewClient,
    updateClient,
    deleteClient,
} = require('../controller/client.controller');

router.route('/list')
    .get(listAllClients)
    .post(findClients)

router.route('/process')
    .post(createNewClient)
    .put(updateClient)

router.route('/one')
    .post(findOneClient)

router.route('/one/:idClient')
    .get(findClientById)
    .delete(deleteClient)

module.exports = router;