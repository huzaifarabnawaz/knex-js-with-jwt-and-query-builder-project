
const express=require("express")
const app=express()
app.use(express.json())
const db=require('./db/dbconnection')   
const {signup,login,getuser}=require("./src/users/user")
const {isauth}=require("./authvarification/authvarification")


app.post("/signup",signup)
app.post("/login",login)
app.get("/getuser",isauth,getuser)



app.listen(6000,()=>{
    console.log("port 6000 is runing")
})