import express from "express";
import { connectDB } from "./db/init-db";
import { UserController } from "./user/user.controller";
import { config } from "./utils/config.utils";

// initialize express
// const app = express();
const PORT = Number(process.env.PORT) || 8000;

class Server {
  private app;
  private userRoutes;
  constructor() {
    this.app = express();
    this.userRoutes = new UserController().loadRoutes();
  }
  public async initDB() {
    await connectDB(config.MONGO_URI);
  }

  public async loadControllers() {
    // bodyParser
    this.app.use(express.json());
    this.app.get("/", (_, res) => {
      res.send("Welcome");
    });

    this.app.use("/user", this.userRoutes);
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

    // await connectDB(config.MONGO_URI);
    // app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (error) {
    process.exit(1);
  }
})();
