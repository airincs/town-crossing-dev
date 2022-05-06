import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(404).json({ message: "Username doesn't exist." });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Incorrect Password" });
    const token = jwt.sign(
      {
        username: existingUser.username,
        id: existingUser._id,
      },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

export const signup = async (req, res) => {
  const { username, password, confirmPassword, avatar } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });
    //if (password !== confirmPassword)
    //  return res.status(400).json({ message: "Passwords don't match" });
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      username,
      password: hashedPassword,
      avatar,
    });
    const token = jwt.sign(
      { username: result.username, id: result._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Error!" });
  }
};
