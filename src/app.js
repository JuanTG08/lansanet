// Importamos las librerias necesarias
const express = require('express');

// Creamos la instancia del servidor APP
const app = express();

// Middlewares

// Importamos las rutas
const homeRouter = require('./routes/home.router'); // Ruta principal del Home

// Creamos las rutas necesarias
app.use('/', homeRouter);

// Exportamos el app
module.exports = app;