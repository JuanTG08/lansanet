const mongoose = require('mongoose');

const AntenaSchema = new mongoose.Schema({
    ssid_sectorial: {
        type: String,
        required: true,
    },
    mac_sectorial: {
        type: String,
        required: true,
    },
    mode_operation: {
        type: String,
        enum: ['Station', 'AccessPoint'],
        default: 'Station'
    },
    point_to_point: {
        type: Boolean,
        default: false
    },
    name_device: {
        type: String,
        required: true,
    },
    mac_device: {
        type: String,
        required: true,
        unique: true,
    },
    channel: {
        type: Number,
    },
    frequency: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        default: 'United Kingdom',
    },
    potency: {
        type: Number,
        default: 24,
    },
    wireless_security: {
        type: String,
        required: true,
    },
    antena_type: {
        type: String,
        required: true,
    },
    device_version: {
        type: String,
    },
    device_user: {
        type: String,
        default: 'ubnt',
    },
    device_password: {
        type: String,
        default: 'Dania123',
    },
    device_ip: {
        type: String,
        required: true,
    },
    device_location: {
        type: String,
        required: true,
    },
    device_status: {
        type: Boolean,
        default: true,
    }
});

const Antena = mongoose.model('Antena', AntenaSchema);

module.exports = Antena;