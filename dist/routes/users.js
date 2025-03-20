import express from "express";
import { authenticateUser } from "../controllers/users-controller.js";
const router = express.Router();
router.route("/login").post(authenticateUser);
export default router;
//# sourceMappingURL=users.js.map