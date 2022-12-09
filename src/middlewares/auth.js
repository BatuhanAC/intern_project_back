const jwt = require("jsonwebtoken")
const user = require("../models/user.model")
const APIError = require("../utils/errors")

const createToken = async (user, res) => {

  const payload = {
    sub: user._id,
    name: user.name
  }

  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: process.env.JWT_EXPIRES_IN
  })


  return res.status(201).json({
    success: true,
    token,
    message: "Done!"
  })
}

const tokenCheck = async (req, res, next) => {
  const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ")

  if(!headerToken) {
    try {
      throw new APIError("Unauthorized Token!", 401)
    } catch (error) {
      next(error)
    }
  }

  const token = req.headers.authorization.split(" ")[1]

  await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if(err) {
      try {
        throw new APIError("Unvalid Token!", 401)  
      } catch (error) {
        next(error)
      }
    }

    const userInfo = await user.findById(decoded.sub).select("_id name lastName email")

    if(!userInfo) {
      try {
        throw new APIError("Unvalid Token!", 401)  
      } catch (error) {
        next(error)
      }
    }

    req.user = userInfo;

    
  })

  next()
}

module.exports = {
  createToken,
  tokenCheck
}