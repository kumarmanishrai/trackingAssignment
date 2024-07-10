const jwt = require("jsonwebtoken");
const { ACCESS_SECRET } = require("../configs/dotenvConfig");
const userSchema = require("../models/StoreOwnerSchema");


const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      res.status(401);
      throw new Error("user is not authorized");
    }

    const verified = jwt.verify(token, ACCESS_SECRET);
    const user = await userSchema
      .findById(verified?.id)
      .select("-password -refreshToken");
      
    if (!user) {
      res.status(401);
      throw new Error("Invalid access token");
    }
    // console.log("user is authorized");
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};


module.exports = verifyUser;



