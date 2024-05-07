import express from "express";
import {
  addComment,
  createPost,
  deletePost,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.post("/create", verifyToken, createPost);
router.patch("/:id/like", verifyToken, likePost);
router.delete("/:id", deletePost);
router.post("/:postId/comments", verifyToken, addComment);
export default router;
