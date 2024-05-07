import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueFilename = Date.now() + ext;
    req.generatedFilename = uniqueFilename;
    cb(null, uniqueFilename);
  },
});
const upload = multer({ storage: storage }).single("picture");

export const register = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.log("multer error: " + err.message);
        return res.status(500).json({ message: err.message });
      } else if (err) {
        console.log("multer error: " + err.message);
        return res.status(500).json({ message: err.message });
      }

      const profile = req.generatedFilename;

      const { firstName, lastName, email, password } = req.body;
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      console.log(req.file);
      // Create new user instance
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picture: profile,
        friends: [],
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
      });

      // Save user to database
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Route with multer middleware for file upload

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
