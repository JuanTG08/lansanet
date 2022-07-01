const { Message } = require("../config/utils");
const { generateTokenId } = require("../middlewares/Auth");
const UserModel = require("../model/user.model");

const userCtrl = {};

userCtrl.createNewUser = async (req, res) => {
    const { data } = req.body;

    const User = new UserModel();
    const saveUser = await User.createNewUser(data);

    res.json(saveUser);
}

userCtrl.listAllUsers = async (req, res) => {
    const User = new UserModel();
    const getListUsers = await User.listAllUsers();

    res.json(Message(false, 200, "Usuarios", getListUsers.others));
}

userCtrl.loginUser = async (req, res) => {
    const { data } = req.body;
    let response = Message(true, 406, "Campo Vacios");

    const User = new UserModel();
    const getUser = await User.findOneUser(data);

    if (!getUser.error && getUser.statusCode === 200 && getUser.others) {
        const { email, password, role } = getUser.others;
        const token = await generateTokenId({ email, password, role, expiration_time_min: 30 });
        if (token.error) response = Message(true, 802, "Error de conexion");
        else response = token;
    }else {
        response = getUser;
    }
    res.json(response);
}

module.exports = userCtrl;