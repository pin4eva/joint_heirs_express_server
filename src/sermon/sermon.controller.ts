import { Request, Response, Router } from "express";
import { handleError } from "../utils/express.utils";
import { SermonService } from "../../../express-todo/src/sermon/sermon.service";

export class SermonController {
  router = Router();

  public LoadRoutes() {
    this.router.post("/", async (req, res) => {
      try {
        const sermons = await new SermonService().createSermon(req.body);
        return res.status(200).json(sermons);
      } catch (error) {
        handleError(error, res);
      }
    });

    this.router.get("/", async (_: Request, res: Response) => {
      try {
        const sermons = await new SermonService().getSermons();
        return res.status(200).json(sermons);
      } catch (error) {
        handleError(error, res);
      }
    });

    this.router.put("/update", async (req, res) => {
      try {
        const sermon = await new SermonService().updateSermon(req.body);
        return res.status(200).json(sermon);
      } catch (error) {
        handleError(error, res);
      }
    });

    this.router.get("/single/:id", async (req: Request, res: Response) => {
      try {
        const sermon = await new SermonService().getSermonById(req.params.id);
        return res.status(200).json(sermon);
      } catch (error) {
        handleError(error, res);
      }
    });

    this.router.delete("/delete", async (req: Request, res: Response) => {
      try {
        const sermons = await new SermonService().deleteSermon(req.body.id);
        return res.status(200).json(sermons);
      } catch (error) {
        handleError(error, res);
      }
    });

    return this.router;
  }
}
