import { Request, Response, Router } from "express";
import { handleError } from "../utils/express.utils";
import { UserService } from "./user.service";

export class UserController {
  router = Router();

  loadRoutes() {
    this.router.get("/", async (req: Request, res: Response) => {
      try {
        const users = await new UserService().getUsers();

        return res.status(200).json(users);
      } catch (error) {
        handleError(error, res);
      }
    });

    return this.router;
  }
}
