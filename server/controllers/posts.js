import Post from "../models/Posts.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
    try{
        const {userid, description, picturePath} = req.body;
        const user = await User.findById(userid);
        const newPost = new Post({
            userid,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comment: []
        });
        await newPost.save();
        const post = await Post.find();

        res.status(201).json(post);
    }catch(error){
        res.status(409).json({error: error.message});
    }
}

export const getFeedPosts = async (req, res) => {
    try{
        const post = await Post.find();
        res.status(201).json(post);
    }catch(error){
        res.status(404).json({error: error.message});
    }
}

export const getUserPosts = async (req, res) => {
    try{
        const {userid} = req.params;
        const post = await Post.find({userid});
        res.status(201).json(post);
    }catch(error){
        res.status(404).json({error: error.message});
    }
}

export const likePosts = async (req, res) => {
    try{
        const {id} = req.params;
        const {userid} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userid);

        if (isLiked){
            post.likes.delete(userid);
        }else{
            post.likes.set(userid, true);
        }
    
        updatedPost = await Post.findByIdAndUpdate(id,
            {likes: post.likes},
            {new: true});
        res.status(200).json(updatedPost);

    }catch(error){
        res.status(404).json({error: error.message});
    }
}