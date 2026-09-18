import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Preference from "../models/Preference.js";
import { COOKIE_NAME, cookieOptions } from "../utils/generateToken.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const sendAuth = (res, user) => {
  res.cookie(COOKIE_NAME, signToken(user._id), cookieOptions());
  res.json({ user: user.toSafeObject() });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });
    await Preference.create({ user: user._id });
    sendAuth(res, user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    sendAuth(res, user);
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const preference = await Preference.findOne({ user: req.user._id });
    res.json({
      user: req.user.toSafeObject(),
      preference,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.cookie(COOKIE_NAME, "", { ...cookieOptions(), maxAge: 0 });
  res.json({ message: "Logged out" });
};
