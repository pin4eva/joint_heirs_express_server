import express from "express";
import { AuthController } from "./auth/auth.controller";
import { connectDB } from "./db/init-db";
import { UserController } from "./user/user.controller";
import { config } from "./utils/config.utils";
import cors from "cors";
import { EventController } from "./event/event.controller";
// initialize express
// const app = express();
const PORT = Number(process.env.PORT) || 8000;

class Server {
  private app;
  private userRoutes;
  private authRoutes;
  private eventRoutes;
  constructor() {
    this.app = express();
    this.userRoutes = new UserController().loadRoutes();
    this.authRoutes = new AuthController().loadRoutes();
    this.eventRoutes = new EventController().loadRoutes();
  }
  public async initDB() {
    await connectDB(config.MONGO_URI);
  }

  public async loadControllers() {
    // bodyParser
    this.app.use(express.json());
    this.app.use(cors({ origin: true }));
    this.app.get("/", (_, res) => {
      res.send("Welcome");
    });

    this.app.use("/user", this.userRoutes);
    this.app.use("/auth", this.authRoutes);
    this.app.use("/event", this.eventRoutes);
  }

  public run() {
    this.app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  }
}

(async () => {
  try {
    const server = new Server();
    await server.initDB();

    await server.loadControllers();

    server.run();

    await connectDB(config.MONGO_URI);
    // app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (error) {
    process.exit(1);
  }
})();
