import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";
const knex = initKnex(configuration);
const { JWT_SECRET_KEY } = process.env;
export const authenticateUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password || !username.trim() || !password.trim()) {
        console.log("Error Code 404: Username and Password must be provided");
        res.status(404).json({ message: "Username and Password must be provided" });
        return;
    }
    try {
        const user = await knex("users").where({ username, password }).first();
        if (!user) {
            console.log("Error Code 401: No User Found");
            res.status(401).json({ message: "No User Found, Authentication Failed" });
            return;
        }
        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    }
    catch (error) {
        console.log(`Error Code 500: Error connecting to database. ${error}`);
        res.status(500).json({
            message: "Error connecting to database when authenticating user.",
        });
        return;
    }
};
export const getUserPosts = async (req, res) => {
    if (!req.user) {
        console.log("Error Code 401: Not Authorized");
        res.status(401).json({ message: "Not Authorized" });
        return;
    }
    try {
        const posts = await knex("posts")
            .join("users", "posts.user_id", "users.id")
            .where({ user_id: req.user.id })
            .select("posts.*", "users.id as user_id", "users.username");
        console.log(posts);
        res.json(posts);
    }
    catch (error) {
        console.log(`Error Code 500: Database Error when getting user posts`);
        res.status(500).json({ message: "Database Error when getting user posts" });
    }
};
//# sourceMappingURL=users-controller.js.map