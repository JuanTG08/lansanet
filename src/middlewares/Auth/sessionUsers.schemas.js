const mongoose = require('mongoose');

const SessionUserSchema = new mongoose.Schema({
    keyId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    initial_time: {
        type: Number,
        default: Date.now(),
    },
    expiration_time: {
        type: Number,
        required: true,
    }
});

const SessionUser = mongoose.model('Auth', SessionUserSchema);

module.exports = SessionUser;