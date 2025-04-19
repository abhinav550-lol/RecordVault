import userController from "../controllers/UserController.js";
import express from "express";
const router = express.Router();
import { isLoggedIn } from "../utils/isLoggedIn.js";

//Get a user by id
router.get("/", isLoggedIn, userController.getUser);

export default router;
