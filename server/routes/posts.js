import express from "express";
import {getFeedPosts, getUserPosts, likePosts } from "../controllers/posts.js";
import { verifytoken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifytoken, getFeedPosts);
router.get("/:userid/posts", verifytoken, getUserPosts);


router.put("/:id/like", verifytoken, likePosts);

export default router;