import express from "express";
import authenticateToken from "../utils/authenticate-token.js";
import {
  authenticateUser,
  getUserPosts,
} from "../controllers/users-controller.js";
const router = express.Router();

router.route("/login").post(authenticateUser);
router.route("/posts").get(authenticateToken, getUserPosts);

export default router;
