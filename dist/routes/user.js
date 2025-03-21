import express from "express";
import authenticateToken from "../utils/authenticate-token.js";
import { getUser, authenticateUser, getUserPosts, } from "../controllers/users-controller.js";
const router = express.Router();
router.route("/").get(authenticateToken, getUser);
router.route("/login").post(authenticateUser);
router.route("/posts").get(authenticateToken, getUserPosts);
export default router;
//# sourceMappingURL=user.js.map