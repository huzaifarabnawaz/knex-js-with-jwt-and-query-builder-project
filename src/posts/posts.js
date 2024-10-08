const express = require('express')
const { validationResult } = require("express-validator")
const knexdb = require("../../db/dbconnection")
const { isAuth } = require("../../authvarification/authvarification")
const uuid = require("uuid");
const bcrypt=require("bcrypt")
const { name } = require('../../constants');
const knex = require('knex');


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


const getingUsers = async (req, res) => {

    try {

        const user = req.user

        

        const getByUser = await knexdb('posts')
            .where('user_id', '=', user.id)
            .select(['id', 'title', 'content']);


        console.log(getByUser)
        return res.status(200).json({ payload: (getByUser) })

    }
    catch (error) {
        console.log(error)
        console.log("internel server error")
        throw error
    }

}


const userPost= async (req, res) => {
    try {

        const id = req.params.id
    


        if (!id) {
            return res.status(404).json("id is ")
        }

        const post = await knexdb("posts")
            .leftJoin('users', 'users.id', '=', 'posts.user_id')
            .select(
                'posts.id',
                'posts.title',
                'posts.content',
                'users.name as user_name',
                'users.email as user_email'
            )
            .where('posts.id', id)
            .first();
            

        const result = {
            id: posts.id,
            title: posts.title,
            content: posts.content,
            user: {
                name: posts.user_name,
                email: posts.user_email
            }
        }

        if (!post) {
            return res.status(404).json("user post not found")
        }

        res.json(result)

    }

    catch (error) {
        console.log(error)
        console.log("internal server error")
        throw error
    }



}


const deletePost = async (req, res) => {
    try {

        const postId = req.params.id

        console.log(postId)

        if (!postId) {
            return res.status(404).json("post not found")
        }


        const deleteId = await knexdb('posts')
            .where({ id: postId, user_id: req.user.id })
            .delete()

        console.log(deleteId)

        if (!deleteId) {
            return res.status('404').json('not found')
        }

        res.status(200).json({ msg: "post hase been deleted successfully ", data: deleteId })

    }
    catch (error) {
        console.log(error)
        console.log("internel server error ")
        throw error
    }

}


const updatePost=async(req,res)=>{
try{

const id=req.params

const {title,content}=req.body

if(!id){
    return res.status(404).json({msg:"user id not found"})
}
 
const posts=await knexdb('posts')
.where(id)
.update({title:title,content:content})

console.log(posts)

if(!posts){
    return res.status(404).json({msg:'posts not found'})
}

return res.status(200).json({msg:"post updated"})

}
catch(error){
    console.log(error)
    console.log('internel server error ')
    throw error
}

}
    
module.exports = { posts,getingUsers,userPost, deletePost,updatePost}