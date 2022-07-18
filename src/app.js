// Importamos las librerias necesarias
const express = require('express');
const morgan = require('morgan');

// Importamos Middlewares
const { isLoggedIn, is_AdminG, is_AdminE } = require('./middlewares/tokenAuth');

// Creamos la instancia del servidor APP
const app = express();

// Obtenemos las variables de configuraciones
const { PORT_SERVER, SECRET_SERVER } = require('./config/config');
// Obtenemos la conexion a MongoDB
const Database = require('./config/database');

// Middlewares
Database.connect(); // Realizamos la conexion a MongoDB
app.use(morgan('dev'));
app.use(express.json());
// app.use(setSessions);

// Establecemos el port del servidor
app.set('PORT', PORT_SERVER);

// Importamos las rutas
const homeRouter = require('./routes/home.router'); // Ruta principal del Home
const userRouter = require('./routes/user.router'); // Ruta relacionada a los usuarios
const antenasRouter = require('./routes/antenas.router'); // Ruta relacionadas a las antenas
const errorRouter = require('./routes/error.router'); // Ruta relacionadas al error404
const error404Router = require('./routes/error404.router'); // Ruta relacionadas al error404

// Creamos las rutas necesarias
app.use('/', homeRouter);
app.use('/error', errorRouter) // Ruta de errores
app.use('/api/users/', userRouter) // Ruta relacionadas a los usuarios
app.use('/api/antenas/', isLoggedIn, is_AdminE, antenasRouter); // Ruta especifica para las antenas

// Ruta error 404
app.use('*', error404Router) // 404 error handler

// Exportamos el app
module.exports = app;