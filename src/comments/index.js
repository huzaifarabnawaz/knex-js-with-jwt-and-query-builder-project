const express=require("express")
const{isAuth}=require("../../authvarification/authvarification")
const{insertComments,getUserComments,getCommentsByFilter}=require("../comments/comments")
const router=express.Router()


router.post("/comments",isAuth,insertComments)
router.get("/getbycomments",isAuth,getUserComments)
router.get("/checkthepost",isAuth,getCommentsByFilter)

module.exports=router