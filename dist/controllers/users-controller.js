import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../utils/hash-password.js";
const knex = initKnex(configuration);
const { JWT_SECRET_KEY } = process.env;
export const getUser = async (req, res) => {
    res.json({ user: req.user });
};
export const authenticateUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password || !username.trim() || !password.trim()) {
        console.log("Error Code 404: Username and Password must be provided");
        res.status(404).json({ message: "Username and Password must be provided" });
        return;
    }
    try {
        const user = await knex("users").where({ username }).first();
        if (!user) {
            console.log("Error Code 404: No User Found");
            res.status(404).json({ message: "No User Found, Authentication Failed" });
            return;
        }
        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            console.log("Error Code 401: Not Authorized");
            res.status(404).json({ message: "Not Authorized" });
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
        res.json(posts);
    }
    catch (error) {
        console.log(`Error Code 500: Database Error when getting user posts`);
        res.status(500).json({ message: "Database Error when getting user posts" });
    }
};
export const addUser = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username.trim() || !password.trim()) {
        console.log(`Error Code 400: Must provide all information`);
        res.status(400).json({ message: "Must provide all information" });
        return;
    }
    if (password.length < 8) {
        console.log(`Error Code 400: Invalid password. Password is too short`);
        res
            .status(400)
            .json({ message: "Invalid password. Password is too short" });
        return;
    }
    try {
        const userAlreadyExists = await knex("users").where({ username }).first();
        if (userAlreadyExists) {
            console.log("Error Code 409: User already exists");
            res.status(409).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await hashPassword(password);
        const [{ id: newUserId }] = await knex("users")
            .insert({ username, password: hashedPassword })
            .returning("id");
        if (!newUserId) {
            throw new Error("User did not insert");
        }
        next();
    }
    catch (error) {
        console.log(`Error Code 500: Database error when posting new user. ${error}`);
        res.status(500).json({ message: "Database error when posting new user" });
    }
};
export const addUserPost = async (req, res) => {
    if (!req.user) {
        console.log("Error Code 401: Not Authorized");
        res.status(401).json({ message: "Not Authorized" });
        return;
    }
    const { title, body } = req.body;
    const userId = req.user.id;
    if (!title.trim() || !body.trim()) {
        console.log("Error Code 400: Must provide all information to post");
        res.status(400).json({ message: "Must provide all information to post" });
    }
    try {
        const [{ id: newPostId }] = await knex("posts")
            .insert({
            user_id: userId,
            title,
            body,
        })
            .returning("id");
        const newPost = await knex("posts")
            .join("users", "posts.user_id", "users.id")
            .where({ "posts.id": newPostId })
            .select("posts.*", "users.id as user_id", "users.username")
            .first();
        res.status(201).json(newPost);
    }
    catch (error) {
        console.log(`Error Code 500: Database error when adding new post`);
        res.status(500).json({ message: "Database error when adding new post" });
    }
};
//# sourceMappingURL=users-controller.js.map