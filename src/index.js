// Importamos el APP
const app = require('./app');

// Ejecutamos la función principal que ejecutara el aplicativo
const init = async () => {
    // Especificamos el puerto
    const port = 5000;
    // Ejecutamos el metodo escucha de express
    await app.listen(port);
    console.log(`Ejecutamos el servidor por el puerto (${port})`);
}

init();