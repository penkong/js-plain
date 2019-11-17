import "reflect-metadata";
import { MetaDataKeys } from "./MetaDataKeys";
// required props
export function bodyValidator(...keys: string[]) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(MetaDataKeys.validator, keys, target, key);
  };
}
