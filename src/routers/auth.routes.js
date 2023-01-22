const router = require("express").Router()
const { login, register, me, addFood, getAllFood, addProgress, getAllProgress } = require("../controllers/auth.controller")
const AuthValidation = require("../middlewares/Validation/auth.validation")
const {tokenCheck} = require("../middlewares/auth")

router.post("/login", AuthValidation.login, login)

router.post("/register", AuthValidation.register, register)

router.post("/addFood", tokenCheck, addFood)

router.get("/getAllFood", tokenCheck, getAllFood)

router.post("/addProgress", tokenCheck,AuthValidation.progress, addProgress)

router.get("/getAllProgress", tokenCheck, getAllProgress)

router.post("/me", tokenCheck, me)

module.exports = router