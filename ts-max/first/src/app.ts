// generics
// flexible and re-use code.
// generic is type related to another type
// Array is type and string is generic
// string [] = Array <string>
const names: Array<string> = ["mk", "z"];
// another generic type is built in ts is Promise
// Promise type
// with generic give info to types
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("this is done!");
  }, 2000);
});
// because of generic can inform ts from split;
promise.then(data => {
  data.split("");
});
// ==========================================
// own generic == creating
// generic function and generic class
// --------
// constraints : add it to generics with extends
function merged<T extends object, U extends object>(objA: T, objB: U): T & U {
  return Object.assign(objA, objB);
}

// now we can not access props because ts dont know
// but with generic we can
const mergedObj = merged({ name: "mk" }, { age: 3 });
