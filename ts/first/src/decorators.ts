// a decorator is simply a way of wrapping one piece of code with another
// functional composition, or higher-order functions.
@classDecorator
class Boat {
  // prop
  // @testDecorator
  color: string = "red";

  // accessor
  @testDecorator
  get formattedColor(): string {
    return `this boat is ${this.color}`;
  }

  // @testDecorator
  @logError("suck in ocean")
  // method
  // we can also use decorator on arg of a method
  pilot(
    @parameterDecorator speed: string,
    @parameterDecorator generate: boolean
  ): void {
    // method start
    speed === "fast" ? console.log("fast") : console.log("lazy");
    // throw new Error();
    console.log("swww");
    // method end  and whole of it is desc.value
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

// decorator factory let us customize , a decorator that return function
function logError(errorMessage: string) {
  // decorator factory pattern
  return function(
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
        console.log(errorMessage);
      }
    };
  };
}

function testDecorator(target: any, key: string): void {
  // prototype only stores methods not props then you can not get props
  // from target it store in constructor
  console.log(key);
}

// decorator for use in arg == parameter
function parameterDecorator(target: any, key: string, index: number) {
  console.log(key, index);
}

// decorator for class
function classDecorator(constructor: typeof Boat) {
  console.log(constructor);
}

// decorator applied when for first time ran not for instances

// new Boat().pilot();

// now we intercept that call to origninal pilot method right here and wrap
// it in our custom fun logError
