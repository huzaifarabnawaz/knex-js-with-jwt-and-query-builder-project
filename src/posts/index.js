const express = require("express")
const {posts,getBypost} = require("./posts")
const{isAuth}=require("../../authvarification/authvarification")
const router = express.Router()


router.post("/posts",isAuth,posts)
router.get("/getbypost", isAuth, getBypost)


module.exports=router


