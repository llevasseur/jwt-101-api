import express from "express";
import authenticateToken from "../utils/authenticate-token.js";
import { getUser, authenticateUser, getUserPosts, addUser, } from "../controllers/users-controller.js";
const router = express.Router();
// Reach at /user
router.route("/").get(authenticateToken, getUser);
router.route("/login").post(authenticateUser);
router.route("/register").post(addUser, authenticateUser);
router.route("/posts").get(authenticateToken, getUserPosts);
export default router;
//# sourceMappingURL=user.js.map