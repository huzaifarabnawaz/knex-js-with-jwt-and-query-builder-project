
const express = require("express");
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const knexdb = require('../../db/dbconnection');
const uuid = require("uuid");
const knex = require("knex");
const jwt = require("jsonwebtoken")
const { signupvalidation, loginvalidation } = require('../../validation/validation');
const { jwtsecretkey } = require('../../constants')
const { isAuth } = require("../../authvarification/authvarification")
const otppassword = require('crypto')


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


        const token = jwt.sign({ id: user.id }, jwtsecretkey);



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

        res.status(200).json({
            success: true, payload: {
                username: req.user.name,
                useremail: req.user.email
            }
        });

    }

    catch (error) {
        console.log(error)
        console.log("internel server error ")
        throw error
    }

}





const updateUsersFields = async (req, res) => {
    try {

        const user = req.user
        const { name, email, password } = req.body

        if (!user) {
            return res.status(404).json("user id not found")
        }


        if (!name && !email && !password) {
            return res.status(401).json({ msg: "please provides fields" })
        }


        const userUpDates = {}
        if (name) userUpDates.name = name;
        if (email) userUpDates.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            userUpDates.password = await bcrypt.hash(password, salt)
        }


        const upDateUsersData = await knexdb('users').where('id', user.id)
            .update(userUpDates)



        if (!upDateUsersData) {
            return res.status(404).json({ msg: "users not update " })
        }

        console.log(upDateUsersData)

        return res.status(200).json("user hase been updated")

    }
    catch (error) {
        console.log(error)
        console.log("internel server error")
        throw error
    }


}





const verifiedEmail = async (req, res) => {
    try {

        const { email } = req.body

        const otp = otppassword.randomInt(100000, 999999)

        const userId = await knexdb('users')
            .where('email', email)
            .update('otp', otp);

        console.log(userId)

        if (!userId) {
            res.status(404).json({ msg: "email not found" })
        }

        return res.status(200).json({ msg: "you request hase been submitted" })
    }
    catch (error) {
        console.log(error)
        console.log("internel server error ")
        throw error
    }
}




const verifiedOtp = async (req, res) => {
    try {

        const {otp} = req.body

        const user = await knexdb('users')
            .where('otp', otp);

            console.log(user)

        if (!user) {
            res.status(404).json({ msg: "email and otp not found" })
        }

        const token = jwt.sign({ id: user[0].id}, jwtsecretkey)

        res.status(200).json({ token: token })

    }

    catch (error) {
        console.log(error)
        console.log("internel server")
        throw error
    }


}



const changePassword = async (req, res) => {
    try {

        const {newpassword}=req.body

        const {id}=req.user


        const user = await knexdb('users')
            .where('id', id)
            .first()


        if (!user) {
            res.status(404).json({ msg: "token not found" })
        }


        const hashpassword = await bcrypt.hash(newpassword, 10)

        const savePassword = await knexdb('users')
            .where('id', id)
            .update('password', hashpassword)


        if (!savePassword) {
            res.status(404).json({ msg: "user id not found" })
        }

        res.status(200).json({ msg: "user password hase been changed" })

    }

    catch (error) {
        console.log(error)
        console.log("internel server error")
        throw error
    }

}

module.exports = { login, signUp, getUser, updateUsersFields, verifiedEmail, verifiedOtp, changePassword };




// {
//     "name":"noman",
//     "email":"noman@gmail.com",
//     "password":"676767"
// }    