import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import path from "path";
import multer from "multer";
import nodemailer from "nodemailer";


// Controller for forgot password functionality
export const forgotPassword = async (req, res) => {
  try {
    // Extract email from request body
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '1h' });

    // Construct reset link
    const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken}`;

    // Create transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Email content
    let mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Password Reset Link',
      html: `<p>You are receiving this email because you (or someone else) has requested the reset of the password for your account.</p>
            <p>Please click on the following link to reset your password:</p>
            <p><a href="${resetLink}">${resetLink}</a></p>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
    };

    // Sending email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred: ', error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: "Password reset link has been sent to your email" });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify token
    jwt.verify(token, process.env.RESET_PASSWORD_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      const user = await User.findById(decodedToken.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(newPassword, salt);

      // Update user's password
      user.password = passwordHash;
      await user.save();

      res.status(200).json({ message: 'Password reset successful' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

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
