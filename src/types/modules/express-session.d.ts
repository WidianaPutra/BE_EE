import "express-session";

declare module "express-session" {
  interface SessionData {
    auth?: {
      userId?: string;
      token?: string;
    };
    user?: {
      email: string;
    };
  }
}
