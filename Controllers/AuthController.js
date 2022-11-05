const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userSchema = require("../Model/userSchema");
const bcrypt = require("bcryptjs");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
dotenv.config();

const loginHandler = () => {};

const signupHandler = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userSchema.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "User Already exists" });
    }
    const hashePassword = await bcrypt.hash(password, 10);
    const result = await userSchema.create({
      email: email,
      password: hashePassword,
      username: username,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      JWT_SECRET_KEY
    );

    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userSchema.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ error: "User Not Exist" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      res.status(400).json({ error: "Invalid Password" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      JWT_SECRET_KEY
    );
    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { loginHandler, signupHandler };
