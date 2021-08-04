const Tlpost = require('../models/tlpost')

exports.addNewPost = async (req, res) => {
    try {
        const { content, user } = req.body
        const newPost = new Tlpost({
            content,
            user
        })
        await newPost.save()
        return res.json({
            status: 'success',
            message: 'New post added successfully'
        })
    } catch (error) {
        return res.json({
            status: 'error',
            message: error
        })
        
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Tlpost.find({})
        return res.json({
            status: 'success',
            content: posts
        })
    } catch (error) {
        return res.json({
            status: 'error',
            message: error
        })
    }
}