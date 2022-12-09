const router = require("express").Router()
const { login, register, me, addFood, getAllFood, addProgress, getAllProgress } = require("../controllers/auth.controller")
const AuthValidation = require("../middlewares/Validation/auth.validation")
const {tokenCheck} = require("../middlewares/auth")

router.post("/login", AuthValidation.login, login)

router.post("/register", AuthValidation.register, register)

router.post("/addFood", addFood)

router.post("/getAllFood", getAllFood)

router.post("/addProgress", addProgress)

router.post("/getAllProgress", getAllProgress)

router.get("/me", tokenCheck, me)

module.exports = router