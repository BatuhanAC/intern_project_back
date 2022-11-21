const APIError = require("../utils/errors")

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode || 400)
      .json({
        succes: false,
        message: err.message
      })
  }
  return res.status(500).json({
    succes: false,
    message: "An error has ocurred! Please check your API."
  })
}

module.exports= errorHandlerMiddleware