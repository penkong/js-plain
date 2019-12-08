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

interface Length {
  length: number;
}

function countAndPrint<T extends Length>(el: T): [T, string] {
  let descr = "got no value";
  if (el.length === 1) {
    descr = "got 1 els.";
  } else if (el.length > 1) {
    descr = "got " + el.length + " els";
  }
  return [el, descr];
}

console.log(countAndPrint("hi there!"));

// new constraints
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

// ======================================
// generic classes
class Storaged<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const stringSt = new Storaged<string>();
stringSt.addItem("mk");
stringSt.addItem("naz");
console.log(stringSt.getItems());

const numSt = new Storaged<number>();

// const objSt = new Storaged<object>();

// built in types that utilize generic
interface Courser {
  title: string;
  description: string;
  completed: Date;
}

// Partial type is built in Ts;
function createCourse(title: string, description: string, date: Date): Courser {
  // partial makes props of interface optional that let
  // us set it to {};
  let couresGoal: Partial<Courser> = {};
  couresGoal.title = title;
  couresGoal.description = description;
  couresGoal.completed = date;
  // because it still it type of partial then we use
  // type casting;
  return couresGoal as Courser;
}

// Readonly type also is built in
// no more can add or push to this arr;
const namez: Readonly<string[]> = ["mk", "3"];
// namez.push('menu');

// ===========================================
// generic vs union types;
// generic alow us to be specific and let us use methods
// on that type.
// generic use when we want lock some type for use.

// ================================================
