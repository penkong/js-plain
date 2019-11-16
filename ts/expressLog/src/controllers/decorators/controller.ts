import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";

export function controller(routePrefix: string) {
  // decorator for class add to constructor
  // decorator for methods add to fucntion.prototype
  return function(target: Function) {
    // pull up middlewares
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      // name of methods
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata("path", target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        "method",
        target.prototype,
        key
      );
      if (path) {
        router[method](`${routePrefix}${path}`, routeHandler);
      }
    }
  };
}
