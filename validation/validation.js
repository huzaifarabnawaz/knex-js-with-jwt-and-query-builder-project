const {check,validation}=require("express-validator")


const signupvalidation=[
    check('name','name is required').not().isEmpty(),
    check('email','email is required').not().isEmpty(),
    check('password','password is required').isLength({main:6})
]


module.exports={signupvalidation}