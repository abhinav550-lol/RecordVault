import bcrypt from 'bcrypt';
import User from "../models/User.js";
import path from 'path'
import pkg from 'validator';
const { isEmail, isMobilePhone, isInt } = pkg;
import AppError from '../error/AppError.js';
import wrapAsyncErrors from '../error/wrapAsyncErrors.js';
import fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);  
const __dirname = dirname(__filename); 


const userController = {};

userController.registerUser = wrapAsyncErrors(async (req, res, next) => {
  const { name, email, password, confirmPassword, phoneNo, graduationYear, branch } = req.body;

  // Checking if all fields are provided
  if (!name || !email || !password || !confirmPassword || !phoneNo) {
    return next(new AppError(400, 'All fields are required.'));
  }

  // Check if email is valid
  if (!isEmail(email)) {
    return next(new AppError(400, 'Invalid email.'));
  }

  // Check if phone number is valid
  if (!isMobilePhone(phoneNo, 'any', { strictMode: false })) {
    return next(new AppError(400, 'Invalid phone number.'));
  }

  // Checking if the user already exists
  const foundUser = await User.findOne({ where: { email } });
  if (foundUser) {
    return next(new AppError(400, 'User already exists.'));
  }

  // Check if password and confirm password are the same
  if (password !== confirmPassword) {
    return next(new AppError(400, 'Password and confirm password do not match.'));
  }

  // Check if graduation year is valid
  if (graduationYear && !isInt(graduationYear, { min: 1000, max: 9999 })) {
    return next(new AppError(400, 'Invalid graduation year.'));
  }

  // Hashing the password
  const hashedPassword = await bcrypt.hash(password, 8);
  const createdUser = await User.create({ name, email, password: hashedPassword, phoneNo, graduationYear, branch });

  // Creating a session for the user
  req.session.userId = createdUser.id;

  //Create user folder in store
  const userFolder = path.join(__dirname, '..', ".." , 'store', createdUser.id);
  fs.mkdirSync(userFolder, { recursive: true });

  return res.status(201).json({
	success : true,
    message: 'User created successfully',
    user: createdUser,
  });
});
  
userController.loginUser = wrapAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Checking if all fields are provided
  if (!email || !password) {
    return next(new AppError(400, 'All fields are required.'));
  }

  // Checking if email is valid
  if (!isEmail(email)) {
    return next(new AppError(400, 'Invalid email.'));
  }

  // Checking if the user exists
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(new AppError(401, 'Invalid email or password.'));
  }

  // Checking if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return next(new AppError(401, 'Invalid email or password.'));
  }

  // Creating a session for the user
  req.session.userId = user.id;

  return res.status(200).json({
	success : true,
    message: 'User logged in successfully',
    user: user,
  });
});

userController.logoutUser = wrapAsyncErrors(async (req, res, next) => {
  req.session.destroy();
  return res.status(200).json({ 
	success : true,
	message: 'User logged out successfully' });
});


userController.getUser = wrapAsyncErrors(async (req, res, next) => {
  const user = await User.findByPk(req.session.userId);
  return res.status(200).json({ 
	success : true,
	message: 'User fetched successfully',
	user
  });
});


export default userController;
