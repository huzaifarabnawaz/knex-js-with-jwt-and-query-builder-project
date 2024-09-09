
const express = require("express");
const bcrypt = require('bcrypt');
const { validationResult, } = require("express-validator");
const knexdb = require('../../db/dbconnection');
const router = express.Router();
const uuid = require("uuid");
const knex = require("knex");
const jwt = require("jsonwebtoken")
const { signupvalidation, loginvalidation } = require('../../validation/validation');
const jwtsecretkey = "seretkey"


const signup = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const email = req.body.email

        console.log(email)


        const result = await knexdb('users')
            .where('email', '=', email).select('email')

        console.log(result)

        if (result.length > 0) {
            return res.status(409).json({ msg: "This user already exists" });
        }


        const passwordHash = await bcrypt.hash(req.body.password, 6);


        await knexdb('users').insert({
            id: uuid.v6(),
            name: req.body.name,
            email: req.body.email,
            password: passwordHash,

        });


        res.status(201).json({ msg: "User has been registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }

};




const login = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const result = await knexdb('users')
            .select('*')
            .where('email', req.body.email);

        console.log(result)

        if (result.length === 0) {
            return res.status(401).json({ msg: "Authentication required, user not found" });
        }

        const user = result[0];


        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ msg: "Authentication error, password is incorrect" });
        }


        const token = jwt.sign({ id: user.id }, jwtsecretkey, { expiresIn: '1h' });


        return res.status(200).json({
            msg: "Logged in successfully",
            token,
            user: { id: user.id, email: user.email, name: user.name }
        });

    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ msg: "Server error" });
    }
};



const getuser = async (req, res) => {
    try {

        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]) {
            return res.status(422).json("please enter valid requerments")
        }

        const auth = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(auth, jwtsecretkey)

        const [user] = await knexdb('users')
            .select('*')
            .from('users')
            .where('id', '=', decode.id)

        console.log(user)

        if (!user) return res.status(401).json("Aunathorized");

         res.status(200).json({ success: true, data: user });

      

    }

    catch (error) {
        console.log("internel server error ")
    }

}


module.exports = { login, signup, getuser };