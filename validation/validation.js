const {check,validation}=require("express-validator")


const SignUpValiDation=[
    check('name','name is required').not().isEmpty(),
    check('email','email is required').not().isEmpty(),
    check('password','password is required').isLength({main:6})
]

const LoginValidation=[
    check('email','email is reuqeire').not().isEmpty(),
    check('password','password is requeired').isLength({min:6})
]




module.exports={SignUpValiDation,LoginValidation}