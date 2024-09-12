const express = require('express')
const knexdb = require("../../db/dbconnection")
const { isAuth } = require("../../authvarification/authvarification")
const uuid = require("uuid")


const insertComments = async (req, res) => {
    try {

        const user = req.user
        const {content,post_id} = req.body

        if (!user) {
            return res.status(404).json({ msg: "user not found" })
        }

        const insertquery = await knexdb('comments')
            .insert({
                id:uuid.v6(),   
                post_id:post_id,
                content: content,
                user_id: user.id,
            }).returning()


        if (!insertquery) {
            return res.status(404).json({ msg: "no content" })
        }



        res.status(200).json({ msg: "your comments hase been added" })


    }
    catch (error) {
        console.log(error)
        console.log("internel server error ")
        throw error
    }
}

module.exports={insertComments}