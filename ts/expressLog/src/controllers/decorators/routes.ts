import "reflect-metadata";
import { Methods } from "./Methods";
import { MetaDataKeys } from "./MetaDataKeys";
// factory decorator
function routeFinder(method: string) {
  return function(path: string) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
      Reflect.defineMetadata(MetaDataKeys.path, path, target, key);
      Reflect.defineMetadata(MetaDataKeys.method, method, target, key);
    };
  };
}
export const get = routeFinder(Methods.get);
export const post = routeFinder(Methods.post);
export const del = routeFinder(Methods.del);
export const put = routeFinder(Methods.put);
export const patch = routeFinder(Methods.patch);
