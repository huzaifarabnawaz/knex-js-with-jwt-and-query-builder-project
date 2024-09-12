const express = require('express')
const { signUp, login, getUser,upDateUsersfields} = require('./user')
const {isAuth} = require('../../authvarification/authvarification')

const router = express.Router()



router.post("/signup",signUp)

router.post("/login",login)

router.get("/getuser",isAuth,getUser)

router.patch("/updateusers",isAuth,upDateUsersfields)

module.exports  = router