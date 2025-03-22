import jwt from "jsonwebtoken";
import "dotenv/config";
const { JWT_SECRET_KEY } = process.env;
export default function authenticateToken(req, res, next) {
  // string split example:
  // "Bearer token"
  // ["Bearer",  "token"]
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("Error Code 403: No JWT provided");
    res.status(403).json({ message: "No JWT Provided" });
    return;
  }
  const token = authHeader.split(" ")[1];
  // decoded is whatever was signed to the jwt. This is id and username in users-controller.ts/authenticateUser
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(`Error Code 498: Token Validation Failed. ${err}`);
      res.status(498).json({ message: "Token validation failed" });
      return;
    }
    req.user = decoded;
    next();
  });
}
//# sourceMappingURL=authenticate-token.js.map
