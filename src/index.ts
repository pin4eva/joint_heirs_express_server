import * as express from "express";
import { AuthController } from "./auth/auth.controller";
import { connectDB } from "./db/init-db";
import { UserController } from "./user/user.controller";
import { config } from "./utils/config.utils";
import { EventController } from "./event/event.controller";
import * as cors from "cors";
import { DepartmentController } from "./department/department.controller";
// initialize express
const app = express();
const PORT = Number(process.env.PORT) || 8000;

class Server {
  private userRoutes = new UserController().loadRoutes();
  private authRoutes = new AuthController().loadRoutes();
  private department = new DepartmentController().loadRoutes();
  private eventRoutes = new EventController().loadRoutes();
  public async initDB() {
    await connectDB(config.MONGO_URI);
  }

  public async loadControllers() {
    // bodyParser
    app.use(express.json());
    app.use(cors({ origin: true }));
    app.get("/", (_, res) => {
      res.send("Welcome");
    });

    app.use("/user", this.userRoutes);
    app.use("/auth", this.authRoutes);
    app.use("/department", this.department);
    app.use("/event", this.eventRoutes);
  }

  public run() {
    app.listen(PORT, () => {
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
    console.error(error);
    process.exit(1);
  }
})();
