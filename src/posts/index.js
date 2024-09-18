const express = require("express")
const {posts,userPost,getingUsers, deletePost,updatePost} = require("./posts")
const{isAuth}=require("../../authvarification/authvarification")
const router = express.Router()


router.post("/posts",isAuth,posts)
router.get("/getbypost",getingUsers,)
router.get("/:id",isAuth,userPost)
router.delete("/:id",isAuth,deletePost)
router.patch("/:id",isAuth,updatePost)

module.exports=router

