const user = require("../models/user.model")
const bcrypt = require("bcrypt")


const login = async (req, res) => {
  console.log(req.body)
  return res.json(req.body)
}

const register = async (req, res) => {
  const { email } = req.body

  const userCheck = await user.findOne({email})

  if (userCheck) {
    console.log("Email adress already in use!")
  } else {
    req.body.password = await bcrypt.hash(req.body.password, 10)
    try {
      const userSave = new user(req.body)
      await userSave.save()
        .then((response) => {
          return res.status(201).json({
            success: true,
            data: response,
            message: "Registered Successfuly!"
          })
        })
        .catch(err => {
          console.log(err)
        }) 
    } catch (error) {
      console.log(error)
    }
  }

  console.log("Şifre:"+req.body.password)
  console.log(req.body)
}

module.exports = {
  login,
  register
}