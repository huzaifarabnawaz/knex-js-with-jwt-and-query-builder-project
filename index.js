
const express=require("express")
const app=express()
app.use(express.json())
const users = require('./src/users')
const post=require("./src/posts")
const comments=require("./src/comments")

app.use('/user',users)
app.use("/post",post)
app.use("/comments",comments)

app.listen(6000,()=>{
    console.log("port 6000 is runing")
})