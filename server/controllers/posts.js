import User from "../models/User.js";
import Post from "../models/Post.js";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueFilename = Date.now() + ext;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage }).single("picture");

export const createPost = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.log("multer error: " + err.message);
        return res.status(500).json({ message: "Error uploading file" });
      }

      const { userId, location, description } = req.body;
      const profile = req.file.filename;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location,
        description,
        userPicturePath: user.picture,
        picture: profile,
        likes: {},
        comments: [],
      });

      const newPostData = await newPost.save();

      res.status(201).json(newPostData);
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, comment, userPicturePath, userName } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      userId,
      userPicturePath,
      userName,
      comment,
      createdAt: new Date(),
    };

    post.comments.push(newComment);

    await post.save();

    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error" });
  }
};
