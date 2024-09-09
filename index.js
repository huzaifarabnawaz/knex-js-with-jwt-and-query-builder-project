
const express=require("express")
const app=express()
app.use(express.json())
const db=require('./db/dbconnection')   
const {signup,login,getuser}=require("./src/users/user")
// const {isauthurized}=require('./authvarefication/authvarification')



app.post("/signup",signup)
app.post("/login",login)
app.get("/getuser",getuser)



app.listen(6000,()=>{
    console.log("port 6000 is runing")
})