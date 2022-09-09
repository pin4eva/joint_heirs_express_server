import { UserDocument } from "./user/user.model";

declare namespace Express {
  declare global {
    namespace Express {
      interface Request {
        user?: UserDocument;
      }
    }
  }
}
