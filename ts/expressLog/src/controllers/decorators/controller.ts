import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";
import { MetaDataKeys } from "./MetaDataKeys";
import { bodyValidator } from "./bodyValidator";
import { NextFunction, Request, Response, RequestHandler } from "express";

function bodyValidators(keys: string): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {};
}

export function controller(routePrefix: string) {
  // decorator for class add to constructor
  // decorator for methods add to fucntion.prototype
  return function(target: Function) {
    // pull up middlewares
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      // name of methods
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetaDataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetaDataKeys.method,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetaDataKeys.middleware, target.prototype, key) ||
        [];

      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
      }
    }
  };
}
