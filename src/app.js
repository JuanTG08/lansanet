// Importamos las librerias necesarias
const express = require('express');
const morgan = require('morgan');


// Creamos la instancia del servidor APP
const app = express();

// Obtenemos las variables de configuraciones
const { PORT_SERVER } = require('./config/config');
// Obtenemos la conexion a MongoDB
const Database = require('./config/database');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
Database.connect(); // Realizamos la conexion a MongoDB

// Establecemos el port del servidor
app.set('PORT', PORT_SERVER);

// Importamos las rutas
const homeRouter = require('./routes/home.router'); // Ruta principal del Home
const antenasRouter = require('./routes/antenas.router'); // Ruta relacionadas a las antenas
const error404Router = require('./routes/error404.router'); // Ruta relacionadas al error404

// Creamos las rutas necesarias
app.use('/', homeRouter);
app.use('/api/antenas/', antenasRouter);

// Ruta error 404
app.use('*', error404Router) // 404 error handler

// Exportamos el app
module.exports = app;