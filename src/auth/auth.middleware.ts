/* eslint-disable @typescript-eslint/no-namespace */
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User, UserDocument } from "../user/user.schema";
import { config } from "../utils/config.utils";

export interface IRequest extends Request {
  user?: UserDocument;
}

export const authGuard = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // get the authorization header and throw error if it doesn't exist
    const authorization = req.headers["authorization"];
    if (!authorization) return res.status(403).send("Unauthorized access");
    // split the authorization to get the token
    const token = authorization.split(" ")[1];
    // we verify the user and throw error if it doesn't exist
    const payload = verify(token, config.SECRET) as { id: string };
    if (!payload?.id) return res.status(403).send("Unauthorized access");
    // we set req.user = user
    const user = await User.findById(payload.id);
    if (!user) return res.status(403).send("Invalid user id");
    req.user = user;

    // call next()
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};
