//
// to decorator know sequence we add to each decorator some config object
// like called metadata
// last decorator to exec must be class decorator
// class decorator reads metadata from each method adds route definition to
// router express.
// metadata
// add to js also, a snippet of info that can be tied to a method prop or
// class definition.
// metadata preserve data we want pass from ts to js , it dont wipe out
// for read and write metadata we using pkg : reflect-metadata
import "reflect-metadata";
// it add single var to global scope Reflect
// const plane = {
//   color: "red"
// };
// it does not show anywhere
// Reflect.defineMetadata("note", "hi there", plane);

// const nott = Reflect.getMetadata("note", plane);
// console.log(nott);

// also we can attach data to prop already created
// Reflect.defineMetadata("note", "hi thier", plane, "color");
// const nott2 = Reflect.getMetadata("note", plane, "color");
// console.log(nott2);
@controller
class Plane {
  color: string = "red";

  @get("/login")
  fly(): void {
    console.log("rerererer");
  }
}

function get(path: string) {
  return function(target: Plane, key: string) {
    Reflect.defineMetadata("path", path, target, key);
  };
}

// const secret = Reflect.getMetadata("secret", Plane.prototype, "fly");
// console.log(secret);

// when we apply decorator to class type of target will chagne become constructor function
function controller(target: typeof Plane) {
  for (let key in target.prototype) {
    const path = Reflect.getMetadata("path", target.prototype, key);
    // router.get(path, target.prototype[key]);
    console.log(path);
  }
}
