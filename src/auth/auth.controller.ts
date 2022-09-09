import { Router } from "express";
import { handleError } from "../utils/express.utils";
import { AuthService } from "./auth.service";

export class AuthController {
  router = Router();

  public loadRoutes() {
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

    return this.router;
  }
}
