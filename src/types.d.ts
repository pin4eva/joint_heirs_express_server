import { UserDocument } from "./user/user.schema";

declare namespace Express {
  declare global {
    namespace Express {
      interface Request {
        user?: UserDocument;
      }
    }
  }
}
