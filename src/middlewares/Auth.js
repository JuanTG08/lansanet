const { Message, getStimationTimeMins } = require("../config/utils");
const SessionModel = require("./Auth/sessionUsers.model");

const Auth = {};

Auth.setSessions = async (req, res, next) => {
  // Establecemos sessiones
  next();
};

// Funciones genericas, las cuales no van a tener un intercambio directo con el cliente
Auth.findSession = async ({ keyId, email }) => {
    const data = {};
    if (!keyId && !email) return false;
    if (keyId) data.keyId = keyId;
    if (email) data.email = email;

    const sessionModel = new SessionModel();
    const findOneSession = await sessionModel.findOneSession(data);

    if (!findOneSession.error && findOneSession.statusCode == 200 && findOneSession.others) return findOneSession.others;
    return false;
}

Auth.verifyTimeInSession = (expiration_time) => { // Verificamos si ya expiro el tiempo de la session
    return expiration_time >= Date.now();
}

Auth.generateTokenId = async ({
  email,
  password,
  role,
  expiration_time_min
}) => {
  // Obtenemos el tiempo actual
  const getCodeTimeNow = Date.now();
  // Obtenemos el tiempo de expiracion mediante esta funcion
  const getTimeExpirated = getStimationTimeMins(
    getCodeTimeNow,
    expiration_time_min
  );

  // Creamos el objeto "data" con la informacion necesaria para crear la session
  const data = {
    keyId: email + "-" + password, // Key encriptada con el email y contraseña
    email,
    password,
    role,
    initial_time: getCodeTimeNow,
    expiration_time: getTimeExpirated,
  };

  // Comprobamos que la session exista o no
  const sessionExist = await Auth.findSession({ email });
  // Si la session existe la eliminamos
  if (sessionExist) await Auth.deleteSession({ keyId: sessionExist.keyId });

  // Obtenemos la conexion con el modelo
  const sessionModel = new SessionModel();
  const createNewSession = await sessionModel.createNewSession(data); // Guardamos la información

  // Si nos da algun error, terminara la conexion
  if (createNewSession.error) return createNewSession;

  // Si todo fue correcto, se retornara la session con su keyId
  return Message(false, 200, "Ok", {Auth: data.keyId});
};

Auth.deleteSession = async (keyId) => { // Eliminamos la función
  const sessionModel = new SessionModel();
  const deleteSession = await sessionModel.deleteOneSession(keyId);
  return deleteSession;
}

Auth.getTokenDescompress = (bearerToken) => {
  return bearerToken.split(" ")[1];
}

// Middlewares
Auth.isLoggedIn = async (req, res, next) => { // Realizamos la comprobacion de que exista este usuario
  const { authorization } = req.headers; // Obtenemos la autorización
  if (!authorization) return res.json(Message(true, 401, "No tienes autorizacion")); // Debemos realizar el error correspondiente
  const tokenId = Auth.getTokenDescompress(authorization);

  const getSessionValid = await Auth.findSession({ keyId: tokenId }); // Obtenemos la session

  if (!getSessionValid) return res.json(Message(true, 404, "No se coincide ninguna respuesta")); // Error correspondiente a que no existe la session

  /*
    Se realizara la comprobacion de la sesion sin necesidad del tiempo, por el momento
  */

  req.body.sessionID = getSessionValid;

  next();
}

module.exports = Auth;
