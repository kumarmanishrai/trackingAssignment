const jwt = require('jsonwebtoken')
const {ACCESS_SECRET, REFRESH_SECRET} = require('../configs/dotenvConfig')



exports.generateToken = async (userid) => {

    const accessToken =  jwt.sign({id: userid}, ACCESS_SECRET, {expiresIn: '2d'})
    const refreshToken = jwt.sign({id: userid}, REFRESH_SECRET, {expiresIn: '30d'})
    
    return {accessToken, refreshToken};

}


