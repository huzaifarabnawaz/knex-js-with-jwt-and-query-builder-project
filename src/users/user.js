
const express = require("express");
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const knexdb = require('../../db/dbconnection');
const router = express.Router();
const tolowercase=require("lowercase")
const uuid=require("uuid")

const register = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const email = req.body.email

        console.log(email)


            const result = await knexdb('users')    
                .where('email','=', email).select('email')

        console.log(result)

        if (result.length > 0) {
            return res.status(409).json({ msg: "This user already exists" });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(req.body.password, 10);


        await knexdb('users').insert({
            id:uuid.v6(),
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

const login =

module.exports = { register };
