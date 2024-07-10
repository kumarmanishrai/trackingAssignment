const { MONGO_URI } = require('../configs/dotenvConfig')
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose
    .connect(MONGO_URI)
    .catch((err)=> {
        console.log("connect error: " + err.message)
    })

const mongo = mongoose.connection

module.exports = mongo