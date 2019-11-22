import "reflect-metadata";
// enums
import { MetaDataKeys } from "./MetaDataKeys";
// types
import { RequestHandler } from "express";
// we use factory decorator when we want give our decorator argument
export function use(middleware: RequestHandler) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const middlewares =
      Reflect.getMetadata(MetaDataKeys.middleware, target, key) || [];
    // middlewares.push(middleware);
    Reflect.defineMetadata(
      MetaDataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
