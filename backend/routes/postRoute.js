import express from 'express'
import { commentPost, createPost, getAllPosts, likePosts } from '../controller/postController.js'

const router = express.Router();

router.post('/:id', createPost)

router.get("/", getAllPosts)

router.post("/comment/:id", commentPost)

router.put("/like/:id", likePosts)

export default router;