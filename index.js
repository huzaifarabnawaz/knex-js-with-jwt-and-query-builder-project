
const express=require("express")
const app=express()
app.use(express.json())
const users = require('./src/users')
const post=require("./src/posts")

app.use('/user',users)
app.use("/post",post)

app.listen(6000,()=>{
    console.log("port 6000 is runing")
})