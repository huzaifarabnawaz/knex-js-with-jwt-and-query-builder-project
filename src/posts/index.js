const express = require("express")
const {posts,getByusers,postByUser, deletePost,updatePost} = require("./posts")
const{isAuth}=require("../../authvarification/authvarification")
const router = express.Router()


router.post("/posts",isAuth,posts)
router.get("/getbypost", isAuth,getByusers)
router.get("/:id",isAuth,postByUser)
router.delete("/:id",isAuth,deletePost)
router.patch("/:id",isAuth,updatePost)

module.exports=router

