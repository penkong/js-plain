import "reflect-metadata";
import { Methods } from "./Methods";
// factory decorator
function routeFinder(method: string) {
  return function(path: string) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", method, target, key);
    };
  };
}
export const get = routeFinder(Methods.get);
export const post = routeFinder(Methods.post);
export const del = routeFinder(Methods.del);
export const put = routeFinder(Methods.put);
export const patch = routeFinder(Methods.patch);
