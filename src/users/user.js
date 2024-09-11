
const express = require("express");
const bcrypt = require('bcrypt');
const { validationResult} = require("express-validator");
const knexdb = require('../../db/dbconnection');
const uuid = require("uuid");
const knex = require("knex");
const jwt = require("jsonwebtoken")
const { signupvalidation, loginvalidation } = require('../../validation/validation');
const { jwtsecretkey } = require('../../constants')



const signUp = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const email = req.body.email;



        const result = await knexdb('users')
            .where('email', '=', email)
            .select('email')


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



        res.status(201).json({ msg: "User has been registered successfully", });

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
            .where('email', '=', req.body.email);


        if (result.length === 0) {
            return res.status(401).json({ msg: "Authentication required, user not found" });
        }

        const user = result[0];


        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ msg: "Authentication error, password is incorrect" });
        }


        const token = jwt.sign({ id: user.id }, jwtsecretkey,{expiresIn:"88h"});

        

        return res.status(200).json({
            msg: "Logged in successfully",
            token,
            user: { id: user.id, email: user.email, name: user.name }
        });

    } 
    catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ msg: "Server error" });
    }
};





const getUser = async (req, res) => {
    try {

        res.status(200).json({ success: true, payload: req.user });

    }

    catch (error) {
        console.log(error)
        console.log("internel server error ")
        throw error
    }

}




module.exports = { login, signUp, getUser };


// {
//     "name":"noman",
//     "email":"noman@gmail.com",
//     "password":"676767"
// }