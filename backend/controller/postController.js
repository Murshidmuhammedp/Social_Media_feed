import mongoose from "mongoose";
import Post from "../models/PostModel.js";

export const createPost = async (req, res) => {
    try {
        const { id } = req.params

        const { content } = req.body;

        console.log("Request Body:", req.body);

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const newPost = new Post({
            user: id,
            content,
            image: req.cloudinaryImageUrl
        });

        await newPost.save()

        return res.status(201).json({ message: "Post Uploaded", data: newPost });

    } catch (error) {

        console.log(error)
        return res.status(500).json({ message: "Server error", error: error })
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        return res.status(200).json({ message: "fetch succesfully", data: posts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const commentPost = async (req, res) => {
    try {
        const { text, userId } = req.body;
        console.log(text, userId, "backend okey aan")
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.comments.push({ user: userId, text });
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const likePosts = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const { userId } = req.body;
        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();
        res.json({
            message: post.likes.includes(userId) ? "Post liked" : "Post unliked",
            likes: post.likes,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
