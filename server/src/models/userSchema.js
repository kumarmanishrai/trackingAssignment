const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    refreshToken: {
        type: String,
        unique: true,
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

module.exports = mongoose.model('user', UserSchema)


