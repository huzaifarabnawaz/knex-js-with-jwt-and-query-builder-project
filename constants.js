require('dotenv').config()

module.exports = {
    localhost:process.env.MY_LOCALHOST,
    username:process.env.USERNSME,
    password:process.env.PASSWORD,
    name: process.env.DATABASE,
    jwtsecretkey:process.env.JWT_SECRETKEY
}