import "reflect-metadata";
// singleton
import { AppRouter } from "../../AppRouter";
// enums
import { Methods } from "./Methods";
import { MetaDataKeys } from "./MetaDataKeys";
// types
import { NextFunction, Request, Response, RequestHandler } from "express";

//-----------------------------------------------------------------------
// automate all checking process for us
function bodyValidators(keys: string[]): RequestHandler {
  // middleware
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("Invalid request");
      return;
    }
    for (const key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`missing property ${key}`);
        return;
      }
    }
    next();
  };
}
//-----------------------------------------------------------------------
// decorator for class add to constructor
// decorator for methods add to fucntion.prototype
export function controller(routePrefix: string) {
  //
  return function(target: Function) {
    // pull up middlewares
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      // name of methods
      const routeHandler = target.prototype[key];
      //
      const path = Reflect.getMetadata(
        MetaDataKeys.path,
        target.prototype,
        key
      );
      //
      const method: Methods = Reflect.getMetadata(
        MetaDataKeys.method,
        target.prototype,
        key
      );
      //
      const middlewares =
        Reflect.getMetadata(MetaDataKeys.middleware, target.prototype, key) ||
        [];
      //
      const requiredBodyProps =
        Reflect.getMetadata(MetaDataKeys.validator, target.prototype, key) ||
        [];
      //
      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
