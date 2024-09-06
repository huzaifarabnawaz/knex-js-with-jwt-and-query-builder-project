
const express=require("express")
const app=express()
app.use(express.json())
const db=require('./db/dbconnection')   
const {signup,login}=require("./src/users/user")
// const {signupvalidation}=require("./validation/validation")
const { sign } = require("jsonwebtoken")

app.post("/signup",signup)
app.post("/login",login)


app.listen(6000,()=>{
    console.log("port 6000 is runing")
})