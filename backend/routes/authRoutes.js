import userController from "../controllers/UserController.js";
import express from "express";
const router = express.Router();

//Register a new user
router.post("/register", userController.registerUser);

//Login a user
router.post("/login", userController.loginUser);

//Logout a user
router.post("/logout", userController.logoutUser);

//Check auth status
router.get("/status", userController.checkAuth);

export default router;
