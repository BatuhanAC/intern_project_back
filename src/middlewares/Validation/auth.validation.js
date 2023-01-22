const joi = require("joi")
const APIError = require("../../utils/errors")

class AuthValidation {
  constructor () {}
    static register = async (req, res, next) => { 
      try {
        await joi.object({
          name: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "Name has to be normal text.",
            "string.empty": "Name can't be empty.",
            "string.min": "Name must be more than 3 chars.",
            "string.max": "Name must be less than 100 chars.",
            "string.required": "Name required."
          }),
          lastName: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "Last name has to be normal text.",
            "string.empty": "Last name can't be empty.",
            "string.min": "Last name must be more than 3 chars.",
            "string.max": "Last name must be less than 100 chars.",
            "string.required": "Last name required."
          }),
          email: joi.string().email().trim().min(3).max(100).required().messages({
            "string.base": "Email name has to be normal text.",
            "string.email": "Email is unvalid.",
            "string.empty": "Email can't be empty.",
            "string.min": "Email must be more than 3 chars.",
            "string.max": "Email must be less than 100 chars.",
            "string.required": "Email required."
          }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Password has to be normal text.",
            "string.empty": "Password can't be empty.",
            "string.min": "Password must be more than 6 chars.",
            "string.max": "Password must be less than 36 chars.",
            "string.required": "Password required."
          }),
        }).validateAsync(req.body)
      } catch (error) {
        try {
          throw new APIError(error.details[0].message)
        } catch (error) {
          next(error)
        }
      }
      next()
  }

  static login = async (req, res, next) => {
    console.log(req.body)
    try {
      await joi.object({
        email: joi.string().email().trim().min(3).max(100).required().messages({
          "string.base": "Email name has to be normal text.",
          "string.email": "Email is unvalid.",
          "string.empty": "Email can't be empty.",
          "string.min": "Email must be more than 3 chars.",
          "string.max": "Email must be less than 100 chars.",
          "string.required": "Email required."
        }),
        password: joi.string().trim().min(6).max(36).required().messages({
          "string.base": "Password has to be normal text.",
          "string.empty": "Password can't be empty.",
          "string.min": "Password must be more than 6 chars.",
          "string.max": "Password must be less than 36 chars.",
          "string.required": "Password required."
        }),
      }).validateAsync(req.body)
    } catch (error) {
      try {
        throw new APIError(error.details[0].message)
      } catch (error) {
        next(error)
      }
    }
    next()
  }


  static progress = async (req, res, next) => {
    try {
      await joi.object({
        values: joi.string().email().trim().min(3).max(100).required().messages({
          "string.base": "Email name has to be normal text.",
          "string.email": "Email is unvalid.",
          "string.empty": "Email can't be empty.",
          "string.min": "Email must be more than 3 chars.",
          "string.max": "Email must be less than 100 chars.",
          "string.required": "Email required."
        }),
        password: joi.string().trim().min(6).max(36).required().messages({
          "string.base": "Password has to be normal text.",
          "string.empty": "Password can't be empty.",
          "string.min": "Password must be more than 6 chars.",
          "string.max": "Password must be less than 36 chars.",
          "string.required": "Password required."
        }),
      }).validateAsync(req.body)
    } catch (error) {
      try {
        throw new APIError(error.details[0].message)
      } catch (error) {
        next(error)
      }
    }
    next()
  }
}

module.exports = AuthValidation