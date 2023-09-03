import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator';

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
  };
  return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {expiresIn: process.env.JWT_EXPIRES_IN,
      });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }

      const {username, email, password} = req.body;

      // Check if user already exists
      const existingUsername = await User.findOne({username});
      if (existingUsername) {
        return res.status(400).json({message: 'Username already used'});
      }

      const existingUserEmail = await User.findOne({email});
      if (existingUserEmail) {
        return res.status(400).json({message: 'Email already used'});
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const user = new User({
        username,
        email,
        password: hashedPassword,
        roles: ['USER'], // default role
      });

      await user.save();

      // Generate JWT token
      const token = generateAccessToken(user.id);

      res.status(201).json({token, _id: user.id});
    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'Something went wrong, try again'});
    }
  }

  async login(req, res) {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message: 'User not found'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: 'Invalid credentials'});
    }

    const token = generateAccessToken(user.id);

    res.json({token, _id: user.id});
  }

  async getUser(req, res) {
    const user = await User
        .findById(req.user._id)
        .select(['-password', '-__v']);
    res.json(user);
  }

  // Something
  async updateUser(req, res) {
    const {username, email} = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const isUsernameUsed = await User.findOne({username});
    if (isUsernameUsed) {
      return res.status(400).json({message: 'Username already used'});
    }

    const isEmailUsed = await User.findOne({email});
    if (isEmailUsed) {
      return res.status(400).json({message: 'Email already used'});
    }


    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.json({message: 'User updated successfully'});
  }

  async deleteUser(req, res) {
    await User.findByIdAndDelete(req.user._id);
    res.json({message: 'User deleted'});
  }
}

export default new AuthController();
