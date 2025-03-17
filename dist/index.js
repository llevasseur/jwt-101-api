import express from "express";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 8080;
app.get("/", (_req, res) => {
    res.send("Welcome to JWT-101-api! 👋");
});
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map