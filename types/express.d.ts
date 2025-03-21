import { Request } from "express";
import User from "./User.ts";

declare module "express" {
  export interface Request {
    user?: User;
  }
}
