
// const bodyParser = require("body-parser")
const express=require("express")
const app=express()
app.use(express.json())
const db=require('./db/dbconnection')   
const {register}=require("./src/users/user")
const {signupvalidation}=require("./validation/validation")

app.post("/api",register)


app.listen(6000,()=>{
    console.log("port 6000 is runing")
})