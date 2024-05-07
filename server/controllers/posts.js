import User from "../models/User.js";
import Post from "../models/Post.js";
import path from "path";
import multer from "multer";

// Multer storage configuration
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

// Multer upload middleware
const upload = multer({ storage: storage }).single("picture");

export const createPost = async (req, res) => {
  try {
    // Handle file upload using multer
    upload(req, res, async (err) => {
      if (err) {
        console.log("multer error: " + err.message);
        return res.status(500).json({ message: "Error uploading file" });
      }

      // Extract required data from the request
      const { userId, location, description } = req.body;
      const profile = req.file.filename; // Use req.file to access uploaded file

      // Find user by userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Create a new post
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

      // Save the new post to the database
      await newPost.save();

      // Fetch all posts after saving the new post
      const posts = await Post.find();

      // Return the updated list of posts
      res.status(201).json(posts);
    });
  } catch (error) {
    // Handle any other errors
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
