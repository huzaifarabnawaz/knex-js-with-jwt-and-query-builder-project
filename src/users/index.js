const express = require('express')
const { signUp, login, getUser,updateUsersFields,verifiedEmail,verifiedOtp,changePassword} = require('./user')
const {isAuth} = require('../../authvarification/authvarification')

const router = express.Router()



router.post("/signup",signUp)

router.post("/login",login)

router.get("/getuser",isAuth,getUser)

router.patch("/updateusers",isAuth,updateUsersFields)

router.post("/sendotp",verifiedEmail)

router.post('/sendjwt',verifiedOtp)

router.patch('/passwordupdate',isAuth,changePassword)

module.exports  = router