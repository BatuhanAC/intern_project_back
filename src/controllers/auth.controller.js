const user = require("../models/user.model")
const food = require("../models/food.model")
const progress = require("../models/progress.model")

const bcrypt = require("bcrypt")
const APIError = require("../utils/errors")
const Response = require("../utils/response")
const { createToken } = require("../middlewares/auth")


const login = async (req, res, next) => {
  const {email, password} = req.body

  const userInfo = await user.findOne({email})

  if(!userInfo) {
    try {
      throw new APIError("Email or password is incorrect!", 401)
    } catch (error) {
      next(error)
    }
  }

  const comparePassword = await bcrypt.compare(password, userInfo.password)

  if(!comparePassword) {
    try {
      throw new APIError("Email or password is incorrect!", 401)
    } catch (error) {
      next(error)
    }
  }


  createToken(userInfo, res)
}

const register = async (req, res, next) => {
  const { email } = req.body

  const userCheck = await user.findOne({email})

  if (userCheck) {
    try {
      throw new APIError("Email adress already in use!", 401)
    } catch (error) {
      next(error)
    } 
  } else {
    req.body.password = await bcrypt.hash(req.body.password, 10)

    const userSave = new user(req.body)
    await userSave.save()
      .then((data) => {
        return new Response(data, "Successfuly Registered!").created(res)
      })
      .catch(err => {
        throw new APIError("Registration Failed!", 400)
      }) 
  }
}

const addFood = async (req, res, next) => {
  
  const saveFood= new food({
    name:req.body.name,
    owner:req.user._id,
    amount:req.body.amount
  })
  console.log(saveFood)
  await saveFood.save()
    .then((data) => {
      return new Response(data, "Successfuly Added!").created(res)
    })
    .catch(err => {
      throw new APIError(err.message, 400)
    })
}

const getAllFood = async (req, res, next) => {
  const owner = req.user._id
  let getFood = await food.find({owner: "None"})
  getFood.push(...await food.find({owner: owner}))
  if(getFood.length >= 1){
    return new Response(getFood, "Successfuly Got Data!").success(res)
  } else { 
    throw new APIError("Couldn't find data by this owner!", 400)
  }
}

const addProgress = async (req, res) => {
  const owner = req.user._id
  const {values} = req.body
  const checkProgress = await progress.findOne({owner})
  if(checkProgress){
    const checkDate = checkProgress.values.find((arg) => arg.date === values[0].date)
    if(checkDate !== undefined){
      try {
        const updateProgress = await progress.updateOne({owner, "values.date": values[0].date}, {"$set":{"values.$":values[0]}})
        return new Response(updateProgress, "Successfuly Got Data!").success(res)
      } catch (error) {
        throw new APIError(error.message, 400)
      }
    } else {
      try {
        const updateProgress = await progress.findOneAndUpdate({owner}, {"$push":{values:values[0]}})
        return new Response(updateProgress, "Successfuly Got Data!").success(res)
      } catch (error) {
        throw new APIError(error.message, 400)
      }
    }   
  } else {
    const saveProgress = new progress(req.body)
    await saveProgress.save()
      .then((data) => {
        return new Response(data, "Successfuly Got Data!").success(res)
      })
      .catch((err) => {
        throw new APIError(err.message, 400)
      })
  }

  
}

const getAllProgress = async (req, res, next) => {
  const owner = req.user._id
  const getProgress = await progress.findOne({owner})
  if(getProgress){
    return new Response(getProgress, "Successfuly Got Data!").success(res)
  } else { 
    throw new APIError("Couldn't find data by this owner!", 400)
  }
}

const me = async (req, res) => {
  return new Response(req.user._id).success(res)
}


module.exports = {
  login,
  register,
  me,
  addFood,
  getAllFood,
  getAllProgress,
  addProgress
}