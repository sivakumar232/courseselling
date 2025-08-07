const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { userModel, purchaseModel } = require("../db");
const userMiddleware = require("../middleware/usermid"); // ✅ default import

// ---------- SIGNUP ----------
userRouter.post("/signup", async (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            email,
            password: hashedPassword,
            firstname,
            lastname,
        });

        await newUser.save();

        res.json({ message: "User account created successfully" });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ---------- SIGNIN ----------
userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
        );

        res.json({ message: "Login successful", token });
    } catch (err) {
        console.error("Signin error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ---------- GET PURCHASES ----------
userRouter.get("/purchases", userMiddleware, async (req, res) => {
    try {
        const purchases = await purchaseModel.find({ userId: req.userId });

        res.json({ purchases });
    } catch (err) {
        console.error("Purchases error:", err);
        res.status(500).json({ message: "Failed to retrieve purchases" });
    }
});

module.exports = userRouter;
