const userSchema = require("../models/userSchema");
const bcryptHelper = require("../helpers/bcryptHelper");
const jwtHelper = require("../helpers/jwtHelper");
const { REFRESH_SECRET, ACCESS_SECRET } = require("../configs/serverConfig");
const jwt = require("jsonwebtoken");


//* register controller

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      const error = new Error("Missing credentials");
      error.status = 400;
      throw error;
    }

    const userExists = await userSchema.findOne({ email: email });
    if (userExists) {
      const error = new Error("User already exists");
      error.status = 409;
      throw error;
    }

    const hashPassword = await bcryptHelper.hashPassword(password);

    const user = await userSchema.create({
      username,
      email,
      password: hashPassword,
    });
    if (user) {
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        message: "user registered successfully",
      });
    } else {
      const error = new Error("Some error occurred");
      error.status = 500;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

//* login controller

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Missing credentials");
      error.status = 400;
      throw error;
    }

    const user = await userSchema.findOne({ email: email });
    const passwordMatched = bcryptHelper.isPasswordCorrect(
      password,
      user.password
    );
    if (user && passwordMatched) {
      const { accessToken, refreshToken } = await jwtHelper.generateToken(
        user._id
      );

      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });

      // const loggedInUser = await storeowner.findOne(user._id).select("-password")

      const accessTokenOptions = {
        httpOnly: true,
        secure: false,
        expires: new Date(Number(new Date()) + 1 * 24 * 3600000),
      };
      const refreshTokenOptions = {
        httpOnly: true,
        secure: false,
        expires: new Date(Number(new Date()) + 28 * 24 * 3600000),
      };
      // const expiryDate = new Date(Number(new Date()) + 7 * 24 * 3600000);

      return res
        .status(200)
        .cookie("refreshToken", refreshToken, refreshTokenOptions)
        .cookie("accessToken", accessToken, accessTokenOptions)
        .json({
          success: true,
          username: user.username,
          email: user.email,
          accessToken: accessToken,
          refreshToken: refreshToken,
          message: "User logged in successfully",
        });
    } else {
      const error = new Error("Invalid credentials");
      error.status = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

//* logout controller

exports.logout = async (req, res, next) => {
  try {
    await userSchema.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: false,
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        message: "User logged out successfully",
        isLoggedOut: true,
      });
  } catch (error) {
    next(error);
  }
};

//* authentication controller

exports.authenticate = async (req, res, next) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;
    const incomingAccessToken = req.cookies.accessToken;
    console.log(req.cookies);

    if (
      incomingAccessToken &&
      jwt.verify(incomingAccessToken, ACCESS_SECRET)
    ) {
      return res.status(200).json({
        status: 200,
        isAuthenticated: true,
        message: "user is authenticated successfully",
      });
    }

    if (!incomingRefreshToken) {
      const error = new Error(
        "User is logged Out and can not be authenticated"
      );
      error.status = 403;
      error.data = {
        isAuthenticated: false,
      };
      throw error;
    }

    const decodedToken = jwt.verify(incomingRefreshToken, REFRESH_SECRET);

    const user = await userSchema.findById(decodedToken?.id);
    if (!user) {
      const error = new Error("Invalid refresh token");
      error.status = 401;
      error.data = {
        isAuthenticated: false,
      };
      throw error;
    }
    if (incomingRefreshToken !== user.refreshToken) {
      const error = new Error("refresh token expired");
      error.status = 400;
      error.data = {
        isAuthenticated: false,
      };
      throw error;
    }

    const accessTokenOptions = {
      httpOnly: true,
      secure: false,
      expires: new Date(Number(new Date()) + 7 * 24 * 3600000),
    };
    const refreshTokenOptions = {
      httpOnly: true,
      secure: false,
      expires: new Date(Number(new Date()) + 28 * 24 * 3600000),
    };
    const { accessToken, refreshToken } = await jwtHelper.generateToken(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, accessTokenOptions)
      .cookie("refreshToken", refreshToken, refreshTokenOptions)
      .json({
        status: 200,
        isAuthenticated: true,
        success: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
        message: "new token created",
      });
  } catch (error) {
    next(error);
  }
};