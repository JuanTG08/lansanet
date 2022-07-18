const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    document_id: {
        type: number,
    },
    number_phone: {
        type: number
    },
    address: {
        type: String,
        required: true,
    },
    neighborhood: {
        type: String,
        required: true,
    },
    email: {
        type: Number,
    },
    installation_date: {
        type: Date,
    },
    payday: {
        type: Number,
        max: 31,
        required: true,
    },
    monthly_value: {
        type: Number,
        default: 40000,
    },
    status: {
        type: String,
        default: 'Activo',
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;