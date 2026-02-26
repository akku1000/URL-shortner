import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashpass = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashpass });

    const accessToken = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // Required for HTTPS (Render/Vercel)
      sameSite: "none", // Required for cross-domain
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const accessToken = jwt.sign({ userid: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // Required for HTTPS (Render/Vercel)
      sameSite: "none", // Required for cross-domain
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { signup, login };
