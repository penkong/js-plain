// a decorator is simply a way of wrapping one piece of code with another
// functional composition, or higher-order functions.
class Boat {
  // prop
  color: string = "red";

  // accessor
  get formattedColor(): string {
    return `this boat is ${this.color}`;
  }

  // @testDecorator
  @logError
  // method
  pilot(): void {
    // method start
    throw new Error();
    console.log("swww");
    // method end desc.value
  }
}
// first arg is protoype of object => prototype of class Boat
// dont show props on constructor , in target
// second key is prop method or accessor
// third arg is descriptor object.
// function testDecorator(target: any, key: string /* ,descriptor*/): void {
//   console.log(target);
//   console.log(key);
// }

function logError(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
  // this is an object that has some configuration options aroud a property
  // defined on an object.
  // PropertyDescriptor : define config prop of prop on that object.
  // object.getOwnPropertyDescriptor(object, prop)
  // writable :  whether this prop can changed
  // enumerable: whether this prop get looped by a for in
  // value : current value
  // configurable : prop definition can change and can delete
  // can change this by Object.defineProperty(Object, propName, new config)
): void {
  const method = descriptor.value;
  descriptor.value = function() {
    try {
      method();
    } catch (error) {
      console.log("upppssss boat!");
    }
  };
}

// decorator applied when for first time ran not for instances
new Boat().pilot();
// now we intercept that call to origninal pilot method right here and wrap
// it in our custom fun logError
