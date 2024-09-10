const express = require('express')
const { validationResult } = require("express-validator")
const knexdb = require("../../db/dbconnection")
const { isAuth } = require("../../authvarification/authvarification")
const uuid = require("uuid");

const posts = async (req, res) => {

    const error = validationResult(req)

    try {


        if (!error.isEmpty) {
            res.status(400).json({ error: errors.array() })
        }

        const { title, content } = req.body


        const user = req.user

        console.log(user)


        const newPost = await knexdb('posts')
            .insert({
                id: uuid.v6(),
                title: title,
                content: content,
                user_id: user.id
            }).returning('*');


        res.status(201).json(newPost)


    }

    catch (error) {
        console.log(error)
        console.log("internel server error")
        throw error
    }


}



const getBypost = async (req, res) => {

    try {

        const user = req.user

        // console.log(user)

        const getByUser = await knexdb('posts')
            .where('user_id','=', user.id)
            .select( ['id', 'title', 'content' ]);


        console.log(getByUser)
        return res.status(200).json({ payload:(getByUser) })

    }
    catch (error) {
        console.log(error)
        console.log("internel server error")
        throw error
    }

}






module.exports = { posts, getBypost }