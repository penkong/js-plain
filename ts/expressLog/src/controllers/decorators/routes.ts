import "reflect-metadata";
// factory decorator
export function get(path: string) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata("path", path, target, key);
  };
}
