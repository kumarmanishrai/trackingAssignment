const dotenv = require('dotenv')

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_SECRET: process.env.ACCESS_KEY_SECRET,
    REFRESH_SECRET: process.env.REFRESH_KEY_SECRET
}
