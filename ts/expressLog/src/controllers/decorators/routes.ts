import "reflect-metadata";
import { Methods } from "./Methods";
import { MetaDataKeys } from "./MetaDataKeys";
import { RequestHandler } from "express";

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler; //take request and response
}

// factory decorator
// value of descriptor is method in controllers remember
function routeFinder(method: string) {
  return function(path: string) {
    return function(
      target: any,
      key: string,
      descriptor: RouteHandlerDescriptor
    ) {
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
