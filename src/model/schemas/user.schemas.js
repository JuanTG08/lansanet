const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        default: false
    },
    role: {
        type: String,
        required: ['AdminG', 'AdminE'],
    },
    status: {
        type: Boolean,
        default: true,
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;