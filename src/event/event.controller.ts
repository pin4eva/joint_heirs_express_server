// import events from "events";
import { Request, Response, Router } from "express";
import { authGuard } from "../auth/auth.middleware";
import { handleError } from "../utils/express.utils";
import { EventService } from "./event.service";

export class EventController {
  router = Router();

  loadRoutes() {
    this.router.get("/", authGuard, async (req: Request, res: Response) => {
      try {
        const events = await new EventService().getEvents();

        return res.status(200).json(events);
      } catch (error) {
        handleError(error, res);
      }
    });

    this.router.post("/", async (req: Request, res: Response) => {
      try {
        const newEvent = await new EventService().createEvent(req.body);
        return res.status(200).json(newEvent);
      } catch (error) {
        handleError(error, res);
        // return res.status(200).json(event);
      }
    });
    this.router.put("/update", async (req: Request, res: Response) => {
      try {
        const event = await new EventService().updateEvent(req.body);
        res.status(404).send(event);
      } catch (error) {
        handleError(error, res);
      }
    });
    this.router.get("/:id", authGuard, async (req: Request, res: Response) => {
      try {
        const event = await new EventService().getEventById(req.params.id);

        return res.status(200).json(event);
      } catch (error) {
        handleError(error, res);
      }
    });
    this.router.delete("/delete", async (req: Request, res: Response) => {
      try {
        const event = await new EventService().deleteEvent(req.body.id);

        return res.status(200).json(event);
      } catch (error) {
        handleError(error, res);
      }
    });
    this.router.delete("/delete/all", async (req: Request, res: Response) => {
      try {
        const events = new EventService().deleteAllEvent(req.body.id);

        return res.status(200).json(events);
      } catch (error) {
        handleError(error, res);
      }
    });
    return this.router;
  }
}
