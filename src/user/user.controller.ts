import { Request, Response, Router } from "express";
import { authGuard } from "../auth/auth.middleware";
import { handleError } from "../utils/express.utils";
import { UserService } from "./user.service";

export class UserController {
  router = Router();

  loadRoutes() {
    this.router.get("/", authGuard, async (req: Request, res: Response) => {
      try {
        const users = await new UserService().getUsers();

        return res.status(200).json(users);
      } catch (error) {
        handleError(error, res);
      }
    });
    this.router.post("/upload", async (req, res) => {
      try {
        const user = await new UserService().uploadImage(req.body);
        res.send(user);
      } catch (error) {
        handleError(error, res);
      }
    });
    this.router.get(
      "/single/:id",
      authGuard,
      async (req: Request, res: Response) => {
        try {
          const user = await new UserService().getUserById(req.params.id);

          return res.status(200).json(user);
        } catch (error) {
          handleError(error, res);
        }
      }
    );
    this.router.delete(
      "/delete",
      authGuard,
      async (req: Request, res: Response) => {
        try {
          const users = await new UserService().deleteUser(req.body.id);

          return res.status(200).json(users);
        } catch (error) {
          handleError(error, res);
        }
      }
    );

    return this.router;
  }
}
