const express = require("express")
const {posts,getBypost,postId,deletePost} = require("./posts")
const{isAuth}=require("../../authvarification/authvarification")
const router = express.Router()


router.post("/posts",isAuth,posts)
router.get("/getbypost", isAuth, getBypost)
router.get("/:id",isAuth,postId)
router.delete("/:id",isAuth,deletePost)

module.exports=router

