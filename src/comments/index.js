const express=require("express")
const{isAuth}=require("../../authvarification/authvarification")
const{insertComments}=require("../comments/comments")
const router=express.Router()


router.post("/comments",isAuth,insertComments)


module.exports=router