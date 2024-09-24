const jwt = require("jsonwebtoken")
const { jwtsecretkey } = require('../constants');
const knexdb = require("../db/dbconnection");
const knex = require("knex");

const isAuth = async (req, res, next) => {

    try {


        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]) {
            return res.status(401).json("please enter valid Credentials")
        }


        const auth = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(auth, jwtsecretkey)


        const { id } = decode

        const user = await knexdb('users')
            .where('id', id)
            .first();
        req.user = user

        next()

    }
    catch (error) {
        console.log("middleware", error)
        console.log("internel server")
        throw error
    }


}

module.exports = { isAuth }