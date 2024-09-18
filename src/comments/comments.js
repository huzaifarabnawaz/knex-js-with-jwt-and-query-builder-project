const knexdb = require("../../db/dbconnection")
const { isAuth } = require("../../authvarification/authvarification")
const uuid = require("uuid")
const knex = require('knex')



const insertComments = async (req, res) => {
    try {

        const user = req.user

        const { content, post_id } = req.body

        if (!user) {
            return res.status(404).json({ msg: "user not found" })
        }

        const insertquery = await knexdb('comments')
            .insert({
                id: uuid.v6(),
                post_id: post_id,
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


const getUserComments= async (req, res) => {
    try {


        const user = req.user

        if (!user) {
            res.status(404).json({ msg: "user id not dound" })
        }

        const getComments = await knexdb('comments')
            .where('user_id', user.id)
            .select('content')

        if (!getByComments) {
            return res.status(404).json({ msg: "comments not  found" })
        }
        return res.status(200).json({ msg: getComments })
    }
    catch (error) {
        console.log(error)
        console.log("internel server error")
        throw error
    }

}


const getCommentsByFilter = async (req, res) => {
    try {

        const { post_id, user_id } = req.query;

        if (!post_id && !user_id) {
            res.status(404).json({ msg: "post_id and user_id not found" })
        }

        let query = knexdb('comments');

        if (post_id) {
            query = query.where('comments.post_id', post_id)
        }

        if (user_id) {
            query = query.andWhere('comments.user_id', user_id)
        }

        const filterComments=await query;

        if (filterComments.length === 0) {
            res.status(404).json({ msg: "comments not found" })
        }

        res.status(200).json(filterComments)

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }

};



const deleteComments=async(req,res)=>{

    const commentId=req.params.id

    if(!commentId){
        res.status(404).json({msg:"commentid not found"})
    }

    const deleteQuery=await knexdb('comments')
    .where('comments.id',commentId)     
    .delete();

    if(!deleteQuery){
        res.status(404).json({msg:"comment not found"})
    }

    res.status(200).json({payload:deleteQuery})
}


module.exports = { insertComments, getUserComments,getCommentsByFilter,deleteComments}