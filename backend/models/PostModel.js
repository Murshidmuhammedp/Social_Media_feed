import mongoose from "mongoose";

const newPost = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    image: {
        type: String
    },
    content: {
        type: String,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        text: String,
        createdAt: {
            type: Date, default: Date.now
        }
    }]
}, { timestamps: true })

const Post = mongoose.model('Post', newPost);

export default Post;