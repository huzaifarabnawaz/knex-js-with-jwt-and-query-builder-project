const express = require('express')
const { signUp, login, getUser,updateUsersFields,verifiedEmail,verifiedOtp,changePassword,matchPasswordAndChange,uploadImage,getApiWithUserData} = require('./user')
const {isAuth} = require('../../authvarification/authvarification')
const {upload}=require("../../cloudinary/multer")

const router = express.Router()



router.post("/signup",signUp)

router.post("/login",login)

router.get("/getuser",isAuth,getUser)

router.patch("/updateusers",isAuth,updateUsersFields)

router.post("/sendotp",verifiedEmail)

router.post('/sendjwt',verifiedOtp)

router.patch('/passwordupdate',isAuth,changePassword)

router.patch('/changepassword',isAuth,matchPasswordAndChange)

router.post("/imageuploader",isAuth ,upload.single('image'),uploadImage)

router.get("/:id",isAuth,getApiWithUserData)

module.exports  = router