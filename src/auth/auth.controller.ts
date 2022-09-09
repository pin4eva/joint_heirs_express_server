import { Router } from "express";
import { handleError } from "../utils/express.utils";
import { authGuard, IRequest } from "./auth.middleware";
import { AuthService } from "./auth.service";

export class AuthController {
  router = Router();

  public loadRoutes() {
    // get me
    this.router.get("/me", authGuard, async (req: IRequest, res) => {
      try {
        const user = req.user;
        res.send(user);
      } catch (error) {
        handleError(error, res);
      }
    });

    // signup
    this.router.post("/signup", async (req, res) => {
      try {
        const input = req.body;
        const data = await new AuthService().signup(input);
        return res.send(data);
      } catch (error) {
        handleError(error, res);
      }
    });

    // login
    this.router.post("/login", async (req, res) => {
      try {
        const input = req.body;
        const data = await new AuthService().login(input);
        return res.send(data);
      } catch (error) {
        handleError(error, res);
      }
    });

    // delete auth
    this.router.delete("/delete", async (req, res) => {
      try {
        const id = req.body.id;
        res.send(await new AuthService().deleteAuth(id));
      } catch (error) {
        handleError(error, res);
      }
    });

    return this.router;
  }
}
