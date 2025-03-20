import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET_KEY } = process.env;

export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // string split example:
  // "Bearer token"
  // ["Bearer",  "token"]
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("Error Code 401: No JWT provided");
    return res.status(401).json({ message: "No JWT Provided" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("Error Code 498: Token Validation Failed");
      return res.status(498).json({ message: "Token validation failed" });
    }
    console.log(decoded);
    req.user = decoded as any;
    next();
  });
}
