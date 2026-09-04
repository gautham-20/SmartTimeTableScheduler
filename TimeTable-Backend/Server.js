const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");  
const jwt = require("jsonwebtoken"); 
const User = require("./Database/User");
require("dotenv").config();

const app = express();
const SECRET_KEY = process.env.SECRET_KEY;
const MONGO_URI = process.env.MONGO_URI;

// Fail fast if env vars are missing - this is where you point to YOUR db
if (!MONGO_URI) {
  console.error("ERROR: MONGO_URI is not defined in .env file.");
  console.error("Copy .env.example to .env and paste your Atlas connection string.");
  process.exit(1);
}
if (!SECRET_KEY) {
  console.error("ERROR: SECRET_KEY is not defined in .env file.");
  process.exit(1);
}
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection - change DB by changing MONGO_URI in .env file
// console.log(process.env.MONGO_URI);
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.log("MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Signup Route (Hashes Passwords)
app.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash Password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstname, lastname, username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Signin Route (Validates User & Returns Token)
app.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user in database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare Passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Signin successful!", token });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
  
  // Example Protected Route
  app.get("/profile", authenticate, (req, res) => {
    res.json({ message: "Welcome to the Profile page!" });
  });
  

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
