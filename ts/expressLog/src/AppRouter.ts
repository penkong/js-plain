import express from "express";
// this is singleton  means there is only one in our app.
export class AppRouter {
  //
  private static instance: express.Router;

  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      // router = express.Router();
      AppRouter.instance = express.Router();
    }
    return AppRouter.instance;
  }
}
